"""Load Brother Eye JSON Schema contracts and validate instances."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from jsonschema.protocols import Validator
from jsonschema.validators import validator_for
from referencing import Registry, Resource
from referencing.jsonschema import DRAFT202012

SCHEMA_DRAFT = "https://json-schema.org/draft/2020-12/schema"


def repo_root() -> Path:
    here = Path(__file__).resolve()
    for candidate in (here, *here.parents):
        if (candidate / "schemas" / "VERSION").is_file():
            return candidate
    raise RuntimeError("Brother Eye repo root not found")


def schemas_root() -> Path:
    return repo_root() / "schemas"


def schema_files() -> list[Path]:
    return sorted(schemas_root().rglob("*.schema.json"))


def example_files() -> list[Path]:
    return sorted((schemas_root() / "examples").glob("*.json"))


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def load_schema(schema_id: str, registry: Registry) -> dict[str, Any]:
    return registry.contents(schema_id)


def build_registry() -> Registry:
    registry: Registry = Registry()
    for path in schema_files():
        schema = load_json(path)
        if "$id" not in schema:
            raise ValueError(f"schema missing $id: {path}")
        if schema.get("$schema") != SCHEMA_DRAFT:
            raise ValueError(f"schema is not Draft 2020-12: {path}")
        resource = Resource.from_contents(schema, default_specification=DRAFT202012)
        registry = resource @ registry
    return registry


def validator_for_schema(schema: dict[str, Any], registry: Registry) -> Validator:
    cls = validator_for(schema)
    cls.check_schema(schema)
    return cls(schema, registry=registry)


def validate_instance(schema: dict[str, Any], instance: Any, registry: Registry) -> None:
    validator_for_schema(schema, registry).validate(instance)

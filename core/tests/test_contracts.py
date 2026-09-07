from __future__ import annotations

from pathlib import Path

import pytest
from jsonschema.exceptions import ValidationError

from brother_eye.contracts.validator import (
    build_registry,
    example_files,
    load_json,
    load_schema,
    schema_files,
    validate_instance,
)

EXAMPLE_TO_SCHEMA_ID = {
    "session-state.valid.json": "https://schemas.brother-eye.local/common/session-state.schema.json",
    "event-envelope.valid.json": "https://schemas.brother-eye.local/events/event-envelope.schema.json",
    "observation.valid.json": "https://schemas.brother-eye.local/events/observation.schema.json",
    "skill-evidence.valid.json": "https://schemas.brother-eye.local/assessment/skill-evidence.schema.json",
    "evidence-group.valid.json": "https://schemas.brother-eye.local/assessment/evidence-group.schema.json",
    "curriculum-skill.valid.json": "https://schemas.brother-eye.local/curriculum/skill.schema.json",
}

REQUIRED_SCHEMA_IDS = (
    "https://schemas.brother-eye.local/common/domain-enums.schema.json",
    "https://schemas.brother-eye.local/common/session-state.schema.json",
    "https://schemas.brother-eye.local/events/event-envelope.schema.json",
    "https://schemas.brother-eye.local/events/observation.schema.json",
    "https://schemas.brother-eye.local/assessment/skill-evidence.schema.json",
    "https://schemas.brother-eye.local/assessment/evidence-group.schema.json",
    "https://schemas.brother-eye.local/curriculum/skill.schema.json",
    "https://schemas.brother-eye.local/rpc/desktop-rpc.schema.json",
)


@pytest.fixture(scope="module")
def registry():
    return build_registry()


def test_all_schemas_are_loadable(registry) -> None:
    files = schema_files()
    assert files, "expected JSON Schema files"
    for schema_id in REQUIRED_SCHEMA_IDS:
        schema = load_schema(schema_id, registry)
        assert schema["$id"] == schema_id


def test_central_refs_resolve(registry) -> None:
    session = load_schema(
        "https://schemas.brother-eye.local/common/session-state.schema.json",
        registry,
    )
    mode_ref = session["properties"]["mode"]["$ref"]
    assert mode_ref.endswith("SessionMode")
    resolved = registry.resolver().lookup(mode_ref)
    assert "LEARN" in resolved.contents["enum"]

    evidence = load_schema(
        "https://schemas.brother-eye.local/assessment/skill-evidence.schema.json",
        registry,
    )
    status_ref = evidence["properties"]["status"]["$ref"]
    resolved_status = registry.resolver().lookup(status_ref)
    assert resolved_status.contents["enum"] == [
        "DRAFT",
        "VALID",
        "DISPUTED",
        "CORRECTED",
        "INVALIDATED",
    ]


def test_valid_examples_pass(registry) -> None:
    examples = example_files()
    assert {path.name for path in examples} == set(EXAMPLE_TO_SCHEMA_ID)
    for path in examples:
        schema = load_schema(EXAMPLE_TO_SCHEMA_ID[path.name], registry)
        validate_instance(schema, load_json(path), registry)


def test_invalid_session_state_fails(registry) -> None:
    schema = load_schema(
        "https://schemas.brother-eye.local/common/session-state.schema.json",
        registry,
    )
    valid = load_json(
        Path(example_files()[0].parent / "session-state.valid.json")
    )
    invalid = dict(valid)
    invalid["mode"] = "COPILOT"
    with pytest.raises(ValidationError):
        validate_instance(schema, invalid, registry)


def test_observation_is_not_skill_evidence(registry) -> None:
    observation_schema = load_schema(
        "https://schemas.brother-eye.local/events/observation.schema.json",
        registry,
    )
    evidence = load_json(
        next(path for path in example_files() if path.name == "skill-evidence.valid.json")
    )
    with pytest.raises(ValidationError):
        validate_instance(observation_schema, evidence, registry)

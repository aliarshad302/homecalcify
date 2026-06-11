import type {
  CalculatorConfig,
  CalculatorField,
  CalculatorResult,
  FieldValue,
  Unit,
} from "./types";

/** Build the initial input state from a config's default values. */
export function initialInputs(
  config: CalculatorConfig,
): Record<string, FieldValue> {
  const state: Record<string, FieldValue> = {};
  for (const field of config.fields) {
    state[field.id] =
      field.defaultValue ?? (field.type === "number" ? "" : field.options?.[0]?.value ?? "");
  }
  return state;
}

/** Coerce a raw field value to a finite number, or NaN. */
export function toNumber(value: FieldValue): number {
  if (typeof value === "number") return value;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

/** True when every required numeric field has a valid, in-range value. */
export function isComputable(
  config: CalculatorConfig,
  inputs: Record<string, FieldValue>,
): boolean {
  return config.fields.every((field) => validateField(field, inputs[field.id]) === null);
}

/** Returns an error string for an invalid field, or null when valid. */
export function validateField(
  field: CalculatorField,
  value: FieldValue,
): string | null {
  if (field.type === "select") return value ? null : `Select ${field.label}`;
  const required = field.required ?? true;
  if (value === "" || value === undefined) {
    return required ? `Enter ${field.label}` : null;
  }
  const n = toNumber(value);
  if (Number.isNaN(n)) return `${field.label} must be a number`;
  if (n < 0) return `${field.label} can't be negative`;
  if (field.min !== undefined && n < field.min) return `Min ${field.min}`;
  if (field.max !== undefined && n > field.max) return `Max ${field.max}`;
  return null;
}

/**
 * Run a calculator's compute function safely.
 * Returns [] when inputs are incomplete/invalid so the UI can show a prompt
 * rather than NaN. Guards against thrown errors in config compute fns.
 */
export function runCalculator(
  config: CalculatorConfig,
  inputs: Record<string, FieldValue>,
  unit: Unit,
): CalculatorResult[] {
  if (!isComputable(config, inputs)) return [];
  try {
    return config
      .compute({ inputs, unit })
      .filter((r) => Number.isFinite(r.value));
  } catch {
    return [];
  }
}

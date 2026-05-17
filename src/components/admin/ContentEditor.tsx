"use client";

import { useEffect, useState } from "react";
import ImageField from "./ImageField";
import TextWithImageUpload from "./TextWithImageUpload";

/** Heuristic for whether a field name represents an image URL. */
function isImageFieldName(key: string): boolean {
  if (/^icon(Name)?$/.test(key)) return false;
  if (/mapEmbed|embedUrl/i.test(key)) return false;
  if (/(image|img|logo|photo|thumbnail|avatar|cover|background)/i.test(key)) return true;
  if (/Src$/.test(key)) return true;
  return false;
}

interface ContentEditorProps {
  content: Record<string, unknown>;
  /** Called when user clicks Save (uncontrolled mode only). */
  onSave?: (content: Record<string, unknown>) => Promise<boolean>;
  /** Called on every field change. When provided, the editor is controlled by parent. */
  onChange?: (content: Record<string, unknown>) => void;
  /** Hide the internal Save/Reset buttons (parent provides them). */
  hideButtons?: boolean;
}

export default function ContentEditor({
  content,
  onSave,
  onChange,
  hideButtons,
}: ContentEditorProps) {
  const [data, setData] = useState<Record<string, unknown>>(() =>
    JSON.parse(JSON.stringify(content))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // When the controlled `content` prop changes externally (e.g. parent reset),
  // sync the internal state.
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(content)));
  }, [content]);

  const apply = (next: Record<string, unknown>) => {
    setData(next);
    onChange?.(next);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    const success = await onSave(data);
    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    apply(JSON.parse(JSON.stringify(content)));
  };

  const updateValue = (path: string[], value: unknown) => {
    const next = JSON.parse(JSON.stringify(data));
    let obj = next;
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = value;
    apply(next);
  };

  const addArrayItem = (path: string[], template: unknown) => {
    const next = JSON.parse(JSON.stringify(data));
    let obj = next;
    for (const key of path) {
      obj = obj[key];
    }
    (obj as unknown[]).push(
      typeof template === "string"
        ? ""
        : JSON.parse(JSON.stringify(template))
    );
    apply(next);
  };

  const removeArrayItem = (path: string[], index: number) => {
    const next = JSON.parse(JSON.stringify(data));
    let obj = next;
    for (const key of path) {
      obj = obj[key];
    }
    (obj as unknown[]).splice(index, 1);
    apply(next);
  };

  return (
    <div>
      <div className="space-y-4">
        {renderFields(data, [], updateValue, addArrayItem, removeArrayItem)}
      </div>

      {!hideButtons && (
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

function renderFields(
  obj: Record<string, unknown>,
  path: string[],
  updateValue: (path: string[], value: unknown) => void,
  addArrayItem: (path: string[], template: unknown) => void,
  removeArrayItem: (path: string[], index: number) => void
): React.ReactNode {
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = [...path, key];
    const label = key.replace(/_/g, " ").replace(/([A-Z])/g, " $1");

    if (typeof value === "string") {
      if (isImageFieldName(key)) {
        return (
          <ImageField
            key={key}
            value={value}
            label={label}
            onChange={(v) => updateValue(currentPath, v)}
          />
        );
      }

      const isLong = value.length > 80 || value.includes("\n");
      return (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {label}
          </label>
          <TextWithImageUpload
            value={value}
            multiline={isLong}
            onChange={(v) => updateValue(currentPath, v)}
          />
        </div>
      );
    }

    if (typeof value === "number") {
      return (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {label}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => updateValue(currentPath, Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      );
    }

    if (typeof value === "boolean") {
      return (
        <div key={key} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <label className="text-sm font-medium text-gray-700 capitalize">
            {label}
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={value}
            onClick={() => updateValue(currentPath, !value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? "bg-primary-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0 || typeof value[0] === "string") {
        return (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {label}
            </label>
            {(value as string[]).map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    updateValue([...currentPath, String(idx)], e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                />
                <button
                  onClick={() => removeArrayItem(currentPath, idx)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem(currentPath, "")}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1"
            >
              + Add item
            </button>
          </div>
        );
      }

      // Array of objects
      return (
        <div key={key} className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3 capitalize">
            {label} ({value.length} items)
          </label>
          {(value as Record<string, unknown>[]).map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-3"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-400">
                  Item {idx + 1}
                </span>
                <button
                  onClick={() => removeArrayItem(currentPath, idx)}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              {renderFields(
                item,
                [...currentPath, String(idx)],
                updateValue,
                addArrayItem,
                removeArrayItem
              )}
            </div>
          ))}
          <button
            onClick={() =>
              addArrayItem(
                currentPath,
                value.length > 0 ? createTemplate(value[0] as Record<string, unknown>) : {}
              )
            }
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            + Add item
          </button>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3 capitalize">
            {label}
          </label>
          {renderFields(
            value as Record<string, unknown>,
            currentPath,
            updateValue,
            addArrayItem,
            removeArrayItem
          )}
        </div>
      );
    }

    return null;
  });
}

function createTemplate(obj: Record<string, unknown>): Record<string, unknown> {
  const template: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") template[key] = "";
    else if (typeof value === "number") template[key] = 0;
    else if (typeof value === "boolean") template[key] = false;
    else if (Array.isArray(value)) template[key] = [];
    else if (typeof value === "object" && value !== null)
      template[key] = createTemplate(value as Record<string, unknown>);
    else template[key] = "";
  }
  return template;
}

import React from "react";
import { marked } from "marked";
import "./VariablePopup.css";

interface VariablePopupProps {
  variable: {
    name: string;
    type: string;
    description?: string;
    value_preview: string;
    count_items?: number;
  };
  onClose: () => void;
}

const VariablePopup: React.FC<VariablePopupProps> = ({ variable, onClose }) => {
  const handleDownload = () => {
    const content = `# Variable: ${variable.name}\n\n**Type:** ${variable.type}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${variable.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formattedContent = `## ${variable.name}\n\n**Type:** \`${variable.type}\`${variable.count_items ? ` (${variable.count_items} items)` : ""}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;

  return (
    <div className="variable-popup-overlay" onClick={onClose}>
      <div className="variable-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="variable-popup-header">
          <h3>Variable Details</h3>
          <div className="variable-popup-actions">
            <button
              className="variable-popup-download-btn"
              onClick={handleDownload}
              title="Download as Markdown"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.5 1a.5.5 0 0 0-1 0v8.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V1z"/>
                <path d="M3 13h10a1 1 0 0 0 1-1v-1.5a.5.5 0 0 0-1 0V12H3v-.5a.5.5 0 0 0-1 0V12a1 1 0 0 0 1 1z"/>
              </svg>
              Download
            </button>
            <button className="variable-popup-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div
          className="variable-popup-body"
          dangerouslySetInnerHTML={{ __html: marked(formattedContent) }}
        />
      </div>
    </div>
  );
};

export default VariablePopup;


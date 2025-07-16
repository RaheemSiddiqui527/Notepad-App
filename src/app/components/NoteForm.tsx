"use client"
import React, { useState, useRef } from "react";

type NoteFormProps = {
  onAdd: (note: string) => void;
};

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        onAdd(note.trim());
        setNote("");
        
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const isDisabled = !note.trim() || isSubmitting;

  return (
    <div style={{ 
      marginBottom: 24,
      padding: 16,
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      border: "1px solid #e9ecef"
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <textarea
            ref={textareaRef}
            value={note}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Write your note here... (Press Ctrl+Enter to submit)"
            style={{
              width: "100%",
              minHeight: 60,
              maxHeight: 200,
              padding: 12,
              border: "2px solid #dee2e6",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              transition: "border-color 0.2s ease",
              backgroundColor: "#fff"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#dee2e6";
            }}
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <div style={{ 
            fontSize: 12, 
            color: "#6c757d",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <span>💡 Tip: Press Ctrl+Enter to quickly add note</span>
            {note.length > 0 && (
              <span style={{ 
                backgroundColor: "#e9ecef",
                padding: "2px 6px",
                borderRadius: 3,
                fontSize: 11
              }}>
                {note.length} characters
              </span>
            )}
          </div>
          
          <div style={{ display: "flex", gap: 8 }}>
            {note.trim() && (
              <button
                type="button"
                onClick={() => {
                  setNote("");
                  if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                    textareaRef.current.focus();
                  }
                }}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "1px solid #dc3545",
                  borderRadius: 4,
                  color: "#dc3545",
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc3545";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#dc3545";
                }}
              >
                Clear
              </button>
            )}
            
            <button
              type="submit"
              disabled={isDisabled}
              style={{
                padding: "8px 16px",
                backgroundColor: isDisabled ? "#6c757d" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: isDisabled ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
              onMouseOver={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseOut={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = "#007bff";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ 
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    border: "2px solid #ffffff40",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Adding...
                </>
              ) : (
                <>
                  📝 Add Note
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
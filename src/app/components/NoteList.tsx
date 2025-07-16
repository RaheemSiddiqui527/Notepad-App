"use client"
import React, { useState } from "react";

type Note = {
  id: string;
  text: string;
  createdAt: Date;
  isPinned?: boolean;
};

type NoteListProps = {
  notes: Note[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  onPin?: (id: string) => void;
};

export default function NoteList({ notes, onDelete, onEdit, onPin }: NoteListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // Pinned notes first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Then by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const handleEditStart = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleEditSave = (id: string) => {
    if (editText.trim() && onEdit) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (notes.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: 40,
        color: "#6c757d",
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        border: "2px dashed #dee2e6"
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <h3 style={{ margin: 0, marginBottom: 8, color: "#495057" }}>No notes yet</h3>
        <p style={{ margin: 0, fontSize: 14 }}>
          Start by adding your first note above!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      {notes.length > 3 && (
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search notes..."
            style={{
              width: "100%",
              padding: 12,
              border: "2px solid #dee2e6",
              borderRadius: 6,
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#dee2e6"}
          />
        </div>
      )}

      {/* Notes Count */}
      <div style={{ 
        marginBottom: 16, 
        fontSize: 14, 
        color: "#6c757d",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
          {searchTerm && ` found for "${searchTerm}"`}
        </span>
        {sortedNotes.some(note => note.isPinned) && (
          <span style={{ fontSize: 12 }}>📌 Pinned notes appear first</span>
        )}
      </div>

      {/* Notes List */}
      <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
        {sortedNotes.map((note) => (
          <li
            key={note.id}
            style={{
              marginBottom: 12,
              backgroundColor: note.isPinned ? "#fff3cd" : "#ffffff",
              border: `2px solid ${note.isPinned ? "#ffeaa7" : "#e9ecef"}`,
              borderRadius: 8,
              padding: 16,
              transition: "all 0.2s ease",
              position: "relative",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            {/* Pin indicator */}
            {note.isPinned && (
              <div style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 16
              }}>
                📌
              </div>
            )}

            {/* Edit mode */}
            {editingId === note.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: 60,
                    padding: 8,
                    border: "2px solid #007bff",
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                    outline: "none",
                    marginBottom: 8
                  }}
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => handleEditSave(note.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12
                    }}
                  >
                    ✓ Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12
                    }}
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Display mode */
              <div>
                <div style={{
                  marginBottom: 8,
                  lineHeight: 1.5,
                  fontSize: 14,
                  color: "#495057",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap"
                }}>
                  {note.text}
                </div>
                
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12,
                  paddingTop: 8,
                  borderTop: "1px solid #e9ecef"
                }}>
                  <span style={{
                    fontSize: 12,
                    color: "#6c757d"
                  }}>
                    {formatDate(note.createdAt)}
                  </span>
                  
                  <div style={{ display: "flex", gap: 4 }}>
                    {onPin && (
                      <button
                        onClick={() => onPin(note.id)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: note.isPinned ? "#ffc107" : "transparent",
                          border: `1px solid ${note.isPinned ? "#ffc107" : "#6c757d"}`,
                          borderRadius: 3,
                          cursor: "pointer",
                          fontSize: 12,
                          color: note.isPinned ? "#000" : "#6c757d"
                        }}
                        title={note.isPinned ? "Unpin note" : "Pin note"}
                      >
                        📌
                      </button>
                    )}
                    
                    {onEdit && (
                      <button
                        onClick={() => handleEditStart(note)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "transparent",
                          border: "1px solid #6c757d",
                          borderRadius: 3,
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#6c757d"
                        }}
                        title="Edit note"
                      >
                        ✏️
                      </button>
                    )}
                    
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this note?")) {
                            onDelete(note.id);
                          }
                        }}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "transparent",
                          border: "1px solid #dc3545",
                          borderRadius: 3,
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#dc3545"
                        }}
                        title="Delete note"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* No search results */}
      {searchTerm && filteredNotes.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: 20,
          color: "#6c757d",
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          border: "1px solid #dee2e6"
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
          <p style={{ margin: 0 }}>No notes found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
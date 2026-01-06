import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import CircleLoaders from "../components/Loader";

export const InboxManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load messages");
        console.error(error);
      } else {
        setMessages(data || []);
        if (data?.length) {
          setSelectedMessage(data[0]);
        }
      }

      setLoading(false);
    };

    loadMessages();
  }, []);

  const toggleSelectMessage = (id) => {
    setSelectedMessages((prev) => {
      const set = new Set(prev);
      set.has(id) ? set.delete(id) : set.add(id);
      return set;
    });
  };

  const handleDelete = (id = null) => {
    const toDelete = id ? [id] : Array.from(selectedMessages);
    if (!toDelete.length) return;

    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Delete {toDelete.length} message(s)?</span>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          onClick={async () => {
            toast.dismiss(t.id);

            const { error } = await supabase
              .from("messages")
              .delete()
              .in("id", toDelete);

            if (error) {
              toast.error("Failed to delete messages");
              console.error(error);
              return;
            }

            setMessages((prev) => prev.filter((m) => !toDelete.includes(m.id)));
            setSelectedMessages(new Set());

            if (selectedMessage && toDelete.includes(selectedMessage.id)) {
              setSelectedMessage(null);
              setShowPreview(false);
            }

            toast.success("Message deleted");
          }}
        >
          Delete
        </button>
      </div>
    ));
  };

  if (loading) return <CircleLoaders />;

  return (
    <div className="bg-white rounded-lg shadow-sm h-[80vh] flex overflow-hidden relative">
      <div
        className={`
          w-full md:w-2/5
          border-r border-[#e4e2dc]
          flex flex-col
          ${showPreview ? "hidden md:flex" : "flex"}
        `}
      >
        <div className="p-4 border-b border-[#e4e2dc] flex justify-between items-center shrink-0">
          <div className="flex gap-2 items-end">
            <h2 className="text-lg font-semibold">Inbox</h2>
            <span className="text-sm text-gray-500">({messages.length})</span>
          </div>

          {selectedMessages.size > 0 && (
            <button
              onClick={() => handleDelete()}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="p-4 text-gray-500 text-center">
              No messages available
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMessage(m);
                  setShowPreview(true);
                }}
                className={`flex gap-3 p-4 items-start cursor-pointer border-b transition-colors border-[#eee]
                  ${
                    selectedMessage?.id === m.id
                      ? "bg-gray-100 border-l-4 border-blue-600"
                      : "hover:bg-[#f5f5f5]"
                  }
                `}
              >
                <input
                  type="checkbox"
                  aria-label={`Select message from ${m.name}`}
                  checked={selectedMessages.has(m.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelectMessage(m.id);
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-medium truncate">{m.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-[13px] text-gray-600 truncate">
                    {m.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={`
          flex-1 p-6 overflow-y-auto
          ${showPreview ? "block" : "hidden md:block"}
        `}
      >
        <button
          onClick={() => setShowPreview(false)}
          className="md:hidden mb-4 text-sm text-blue-600"
        >
          ← Back to Inbox
        </button>

        {!selectedMessage ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a message to view
          </div>
        ) : (
          <>
            <div className="border-b pb-4 mb-4">
              <h2 className="text-[1.5rem] font-semibold">
                {selectedMessage.name}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedMessage.email}
                {selectedMessage.phone && ` • ${selectedMessage.phone}`}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </div>

            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {selectedMessage.message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

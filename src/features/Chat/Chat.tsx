import { For, createSignal, createUniqueId, onMount } from "solid-js";
import ChatWrapper from "./ChatWrapper";
import SidebarWrapper from "./SidebarWrapper";
import NavbarWrapper from "./NavbarWrapper";
import { sendMessage } from "~/services/chat.service";
import { useNavigate } from "@solidjs/router";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const navigate = useNavigate();

  onMount(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div class="h-screen bg-background flex font-sans text-foreground overflow-hidden relative">
      <NavbarWrapper />

      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex flex-1 overflow-hidden size-full">
          <SidebarWrapper>History will be displayed here<br/>(Coming soon)</SidebarWrapper>

          <ChatWrapper>
            <ChatSection />
          </ChatWrapper>
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  const [input, setInput] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const [messages, setMessages] = createSignal<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);

  const projectId = createUniqueId();

  const handleSend = async () => {
    const text = input().trim();

    if (!text || loading()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendMessage(projectId, text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer ?? "No response received",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get response from AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col h-full w-full">
      {/* Messages */}
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <For each={messages()}>
          {(message) => (
            <div
              class={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "ml-auto bg-gray-500 text-white rounded-tr-none"
                  : "bg-neutral-200 text-black rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
          )}
        </For>

        {loading() && (
          <div class="bg-neutral-200 text-black rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div class="border-t p-4 flex gap-3">
        <input
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          class="flex-1 border rounded-lg px-4 py-3"
        />

        <button
          onClick={handleSend}
          disabled={loading()}
          class="px-5 py-3 bg-black text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

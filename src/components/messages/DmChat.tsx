import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, ThemeIcon, ActionIcon, Input, Text } from "@mantine/core";
import { IconLock, IconMicrophone, IconSend, IconMessage2 } from "@tabler/icons-react";
import { type User } from "../../constants/users";
import { type DirectMessage } from "../../constants/messages";
import { Show } from "../../utilities/Show";
import { cn } from "../../lib/utils";

interface DmChatProps {
  user: User | undefined;
  messages: DirectMessage[];
  newMessage: string;
  onNewMessage: (val: string) => void;
  onSend: () => void;
}

export function DmChat({ user, messages, newMessage, onNewMessage, onSend }: DmChatProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Show
      when={user}
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3">
            <ThemeIcon size={60} radius="xl" color="gray" variant="light">
              <IconMessage2 size={30} />
            </ThemeIcon>
            <Text c="dimmed">Select a conversation to start messaging</Text>
          </div>
        </div>
      }
    >
      {u => (
        <>
          <div className="p-4 border-b border-[#e8ecf0] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={u.avatar} size={40} radius="xl" />
                  <div className="absolute bottom-[1px] right-[1px] w-[10px] h-[10px] rounded-full bg-[#4caf50] border-2 border-white" />
                </div>
                <div>
                  <Text fw={700} size="sm">{u.name}</Text>
                  <Text size="xs" c="dimmed">@{u.username}</Text>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeIcon size={26} radius="xl" variant="light" color="teal">
                  <IconLock size={13} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">E2E Encrypted</Text>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
                >
                  <Show when={!msg.isOwn}>
                    <Avatar src={u.avatar} size={28} radius="xl" className="mr-2 mt-[2px] flex-shrink-0" />
                  </Show>
                  <div
                    className={cn("max-w-[70%] px-3 py-2", msg.isOwn ? "text-white" : "bg-[#f0f2f5] text-[#1a202c]")}
                    style={{
                      borderRadius: msg.isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      backgroundColor: msg.isOwn ? "#1f8ba5" : undefined,
                    }}
                  >
                    <Text size="sm" style={{ lineHeight: 1.5 }}>{msg.content}</Text>
                    <Text size="xs" className="opacity-65 mt-1 text-right">{msg.timestamp}</Text>
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>
          </div>

          <div className="p-4 border-t border-[#e8ecf0] flex-shrink-0">
            <div className="flex items-center gap-2">
              <ActionIcon size="lg" radius="xl" variant="subtle" color="gray">
                <IconMicrophone size={17} />
              </ActionIcon>
              <Input
                placeholder="Write a message..."
                value={newMessage}
                onChange={e => onNewMessage(e.currentTarget.value)}
                onKeyDown={e => { if (e.key === "Enter") onSend(); }}
                className="flex-1"
                radius="xl"
                size="sm"
              />
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  onClick={onSend}
                  style={{ background: "linear-gradient(135deg, #1f8ba5, #0e7891)", color: "white" }}
                >
                  <IconSend size={15} />
                </ActionIcon>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}

import { motion } from "framer-motion";
import { Avatar, Badge, Text, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { USERS } from "../../constants/users";
import { DM_CONVERSATIONS } from "../../constants/messages";
import { Show } from "../../utilities/Show";
import { cn } from "../../lib/utils";


interface DmSidebarProps {
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
}

export function DmSidebar({ selectedUserId, onSelect }: DmSidebarProps) {
  return (
    <motion.div
      key="dm-list"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.15 }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <Input
          placeholder="Search messages..."
          leftSection={<IconSearch size={13} />}
          size="xs"
          radius="xl"
          classNames={{ input: "bg-white text-xs" }}
        />
      </div>

      {DM_CONVERSATIONS.map(conv => {
        const user = USERS.find(u => u.id === conv.userId);
        if (!user) return null;
        const isSel = selectedUserId === conv.userId;
        return (
          <div
            key={conv.userId}
            onClick={() => onSelect(conv.userId)}
            className={cn(
              "px-4 py-3 cursor-pointer transition-all border-l-[3px]",
              isSel ? "bg-[#e8f5f7] border-l-[#1f8ba5]" : "border-l-transparent hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Avatar src={user.avatar} size={38} radius="xl" />
                <div className="absolute bottom-[1px] right-[1px] w-[9px] h-[9px] rounded-full bg-[#4caf50] border-[1.5px] border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Text size="sm" fw={600} className="text-[#1a202c]">{user.name}</Text>
                  <Text size="xs" c="dimmed">{conv.time}</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text size="xs" c="dimmed" lineClamp={1} className="flex-1">{conv.lastMessage}</Text>
                  <Show when={conv.unread > 0}>
                    <Badge size="xs" color="teal" variant="filled" circle>{conv.unread}</Badge>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </motion.div>
  );
}

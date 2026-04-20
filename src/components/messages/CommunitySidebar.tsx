import { motion, AnimatePresence } from "framer-motion";
import { Badge, Text, Input } from "@mantine/core";
import { IconSearch, IconHash, IconVolume, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { COMMUNITIES } from "../../constants/communities";
import { COMMUNITY_CHANNELS } from "../../constants/messages";
import { Show } from "../../utilities/Show";
import { cn } from "../../lib/utils";

interface CommunitySidebarProps {
  joinedCommunityIds: string[];
  selectedChannelId: string | null;
  expandedCommunities: Set<string>;
  onToggleExpand: (communityId: string) => void;
  onSelectChannel: (communityId: string, channelId: string) => void;
}

export function CommunitySidebar({
  joinedCommunityIds,
  selectedChannelId,
  expandedCommunities,
  onToggleExpand,
  onSelectChannel,
}: CommunitySidebarProps) {
  const joinedCommunityData = COMMUNITIES.filter(c => joinedCommunityIds.includes(c.id));

  return (
    <motion.div
      key="community-list"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col h-full"
    >
      <div className="px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <Input
          placeholder="Search channels..."
          leftSection={<IconSearch size={13} />}
          size="xs"
          radius="xl"
          classNames={{ input: "bg-white text-xs" }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Joined Communities</span>
        </div>

      {joinedCommunityData.map(community => {
        const channels = COMMUNITY_CHANNELS[community.id] ?? [];
        const isExpanded = expandedCommunities.has(community.id);
        const totalUnread = channels.reduce((s, ch) => s + (ch.unread ?? 0), 0);

        return (
          <div key={community.id} className="mb-1">
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => onToggleExpand(community.id)}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {isExpanded
                    ? <IconChevronDown size={12} className="text-gray-400 flex-shrink-0" />
                    : <IconChevronRight size={12} className="text-gray-400 flex-shrink-0" />
                  }
                  <div
                    className="w-5 h-5 rounded-[5px] flex items-center justify-center text-[12px] flex-shrink-0"
                    style={{ backgroundColor: `${community.color}20`, border: `1px solid ${community.color}30` }}
                  >
                    {community.icon}
                  </div>
                  <Text size="xs" fw={600} lineClamp={1} className="text-[#2d3748] flex-1">{community.name}</Text>
                </div>
                <Show when={!isExpanded && totalUnread > 0}>
                  <Badge size="xs" variant="filled" color="teal" circle>{totalUnread}</Badge>
                </Show>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  {channels.map(channel => {
                    const isCh = selectedChannelId === channel.id;
                    return (
                      <div
                        key={channel.id}
                        onClick={() => onSelectChannel(community.id, channel.id)}
                        className={cn(
                          "pl-9 pr-4 py-[6px] cursor-pointer transition-all border-l-[3px] flex items-center justify-between",
                          isCh ? "" : "border-l-transparent hover:bg-gray-100"
                        )}
                        style={isCh ? { backgroundColor: `${community.color}12`, borderLeftColor: community.color } : {}}
                      >
                        <div className="flex items-center gap-1">
                          {channel.type === "voice"
                            ? <IconVolume size={12} style={{ color: isCh ? community.color : "#a0aec0" }} />
                            : <IconHash size={12} style={{ color: isCh ? community.color : "#a0aec0" }} />
                          }
                          <Text
                            size="xs"
                            style={{ color: isCh ? community.color : "#4a5568", fontWeight: (isCh || channel.unread) ? 600 : 400 }}
                          >
                            {channel.name}
                          </Text>
                        </div>
                        <Show when={(channel.unread ?? 0) > 0}>
                          <Badge size="xs" variant="filled" style={{ backgroundColor: community.color }} circle>
                            {channel.unread}
                          </Badge>
                        </Show>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

        <Show when={joinedCommunityData.length === 0}>
          <div className="p-6 text-center">
            <Text size="xs" c="dimmed">Join communities to start chatting</Text>
          </div>
        </Show>
      </div>
    </motion.div>
  );
}

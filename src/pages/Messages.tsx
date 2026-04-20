import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Text, ThemeIcon } from "@mantine/core";
import { IconMessage2, IconUsersGroup } from "@tabler/icons-react";
import { COMMUNITIES } from "../constants/communities";
import {
  DM_MESSAGES, CHANNEL_MESSAGES, COMMUNITY_CHANNELS,
  type DirectMessage, type ChannelMessage,
} from "../constants/messages";
import { USERS } from "../constants/users";
import { useAppStore } from "../store";
import { DmSidebar } from "../components/messages/DmSidebar";
import { CommunitySidebar } from "../components/messages/CommunitySidebar";
import { DmChat } from "../components/messages/DmChat";
import { CommunityChat } from "../components/messages/CommunityChat";
import { Show } from "../utilities/Show";
import { toast } from "sonner";

type Mode = "direct" | "community";

export function Messages() {
  const { joinedCommunities } = useAppStore();

  const [mode, setMode] = useState<Mode>("direct");
  const [selectedUserId, setSelectedUserId] = useState<string | null>("u2");
  const [dmMessages, setDmMessages] = useState(DM_MESSAGES);

  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>("c1");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>("c1-general");
  const [expandedCommunities, setExpandedCommunities] = useState<Set<string>>(new Set(["c1", "c3"]));
  const [channelMessages, setChannelMessages] = useState(CHANNEL_MESSAGES);

  const [dmInput, setDmInput] = useState("");
  const [channelInput, setChannelInput] = useState("");

  const selectedUserData = USERS.find(u => u.id === selectedUserId);
  const currentDmMessages = selectedUserId ? (dmMessages[selectedUserId] ?? []) : [];

  const selectedCommunity = COMMUNITIES.find(c => c.id === selectedCommunityId);
  const selectedChannels = selectedCommunityId ? (COMMUNITY_CHANNELS[selectedCommunityId] ?? []) : [];
  const selectedChannel = selectedChannelId ? selectedChannels.find(ch => ch.id === selectedChannelId) : null;
  const currentChannelMessages = selectedChannelId ? (channelMessages[selectedChannelId] ?? []) : [];

  function sendDm() {
    if (!dmInput.trim() || !selectedUserId) return;
    const msg: DirectMessage = { id: Date.now().toString(), senderId: "u1", content: dmInput, timestamp: "Now", isOwn: true };
    setDmMessages(prev => ({ ...prev, [selectedUserId]: [...(prev[selectedUserId] ?? []), msg] }));
    setDmInput("");
    toast.success("Message sent!");
  }

  function sendChannelMessage() {
    if (!channelInput.trim() || !selectedChannelId) return;
    const msg: ChannelMessage = { id: Date.now().toString(), senderId: "u1", content: channelInput, timestamp: "Now", isOwn: true };
    setChannelMessages(prev => ({ ...prev, [selectedChannelId]: [...(prev[selectedChannelId] ?? []), msg] }));
    setChannelInput("");
    toast.success("Message sent!");
  }

  function toggleReaction(messageId: string, emoji: string) {
    if (!selectedChannelId) return;
    setChannelMessages(prev => ({
      ...prev,
      [selectedChannelId]: (prev[selectedChannelId] ?? []).map(msg => {
        if (msg.id !== messageId) return msg;
        const reactions = msg.reactions ?? [];
        const existing = reactions.find(r => r.emoji === emoji);
        if (!existing) return { ...msg, reactions: [...reactions, { emoji, count: 1, reacted: true }] };
        return {
          ...msg,
          reactions: reactions
            .map(r => r.emoji === emoji ? { ...r, count: r.count + (r.reacted ? -1 : 1), reacted: !r.reacted } : r)
            .filter(r => r.count > 0),
        };
      }),
    }));
  }

  function toggleExpanded(id: string) {
    setExpandedCommunities(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectChannel(communityId: string, channelId: string) {
    setSelectedCommunityId(communityId);
    setSelectedChannelId(channelId);
    setExpandedCommunities(prev => new Set([...prev, communityId]));
  }

  const activeCommunityContext = selectedCommunity && selectedChannel
    ? { community: selectedCommunity, channel: selectedChannel }
    : null;

  return (
    <div className="max-w-[1100px] mx-auto">
      <Text size="xl" fw={800} className="text-[#1a202c] mb-4">Messages</Text>

      <Card radius="xl" className="border border-[#e8ecf0] overflow-hidden h-[680px] p-0">
        <div className="grid h-full" style={{ gridTemplateColumns: "300px 1fr" }}>

          <div className="border-r border-[#e8ecf0] flex flex-col bg-[#fafbfc] overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#e8ecf0]">
              <div className="flex flex-col gap-1">
                {(["direct", "community"] as const).map(key => {
                  const Icon = key === "direct" ? IconMessage2 : IconUsersGroup;
                  const isActive = mode === key;
                  return (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMode(key)}
                      className="w-full text-left border-none cursor-pointer rounded-[10px] px-3 py-2 transition-all"
                      style={{
                        background: isActive ? "linear-gradient(135deg, #1f8ba5, #0e7891)" : "transparent",
                        color: isActive ? "white" : "#718096",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                          style={{
                            background: isActive ? "rgba(255,255,255,0.2)" : "#eef0f3",
                            color: isActive ? "white" : "#2d91ab",
                          }}
                        >
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold leading-tight">
                            {key === "direct" ? "Direct Messages" : "Communities"}
                          </div>
                          <div
                            className="text-[10px] leading-tight mt-[1px]"
                            style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#a0aec0" }}
                          >
                            {key === "direct" ? "Private conversations" : "Group channels"}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                <Show
                  when={mode === "direct"}
                  fallback={
                    <CommunitySidebar
                      key="community"
                      joinedCommunityIds={joinedCommunities}
                      selectedChannelId={selectedChannelId}
                      expandedCommunities={expandedCommunities}
                      onToggleExpand={toggleExpanded}
                      onSelectChannel={selectChannel}
                    />
                  }
                >
                  <DmSidebar key="dm" selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
                </Show>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col bg-white overflow-hidden">
            <AnimatePresence mode="wait">
              <Show
                when={mode === "direct"}
                fallback={
                  <motion.div key="community-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col h-full">
                    <Show
                      when={activeCommunityContext}
                      fallback={
                        <div className="flex items-center justify-center h-full">
                          <div className="flex flex-col items-center gap-3">
                            <ThemeIcon size={64} radius="xl" variant="light" style={{ color: "#2d91ab", background: "#e8f5f7" }}>
                              <IconUsersGroup size={32} />
                            </ThemeIcon>
                            <Text fw={600} size="md" className="text-[#2d3748]">Select a community channel</Text>
                            <Text c="dimmed" size="sm" className="text-center max-w-[240px] leading-relaxed">
                              Choose a community and channel from the sidebar to start chatting
                            </Text>
                          </div>
                        </div>
                      }
                    >
                      {({ community, channel }) => (
                        <CommunityChat
                          community={community}
                          channel={channel}
                          messages={currentChannelMessages}
                          newMessage={channelInput}
                          onNewMessage={setChannelInput}
                          onSend={sendChannelMessage}
                          onToggleReaction={toggleReaction}
                        />
                      )}
                    </Show>
                  </motion.div>
                }
              >
                <motion.div key="dm-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col h-full">
                  <DmChat
                    user={selectedUserData}
                    messages={currentDmMessages}
                    newMessage={dmInput}
                    onNewMessage={setDmInput}
                    onSend={sendDm}
                  />
                </motion.div>
              </Show>
            </AnimatePresence>
          </div>

        </div>
      </Card>
    </div>
  );
}

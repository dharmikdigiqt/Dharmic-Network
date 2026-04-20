import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, ActionIcon, Tooltip, Text, Input, Badge } from "@mantine/core";
import {
  IconHash, IconUsersGroup, IconPin, IconDots,
  IconMoodSmile, IconPaperclip, IconAt, IconMicrophone, IconSend,
  IconSparkles, IconTrophy, IconX,
} from "@tabler/icons-react";
import { type Community, COMMUNITY_MEMBERS } from "../../constants/communities";
import { type Channel, type ChannelMessage } from "../../constants/messages";
import { USERS, CURRENT_USER } from "../../constants/users";
import { getKarmaLevel } from "../../constants/karma";
import { Show } from "../../utilities/Show";
import { cn } from "../../lib/utils";
import { toast } from "sonner";


const DAILY_SHLOKA = {
  text: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
  translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment.",
  source: "Bhagavad Gita 2.48",
};

interface CommunityChatProps {
  community: Community;
  channel: Channel;
  messages: ChannelMessage[];
  newMessage: string;
  onNewMessage: (val: string) => void;
  onSend: () => void;
  onToggleReaction: (messageId: string, emoji: string) => void;
}

export function CommunityChat({
  community,
  channel,
  messages,
  newMessage,
  onNewMessage,
  onSend,
  onToggleReaction,
}: CommunityChatProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, channel.id]);

  const getUserById = (id: string) => (id === "u1" ? CURRENT_USER : USERS.find(u => u.id === id));

  const leaderboardMembers = (COMMUNITY_MEMBERS[community.id] ?? []).map(({ userId, kp }) => {
    const user = userId === "u1" ? CURRENT_USER : USERS.find(u => u.id === userId);
    return user ? { user, kp } : null;
  }).filter(Boolean) as { user: typeof CURRENT_USER; kp: number }[];

  return (
    <div className="flex flex-row flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="h-[3px] flex-shrink-0" style={{ background: `linear-gradient(90deg, ${community.color}, ${community.color}70)` }} />

      <div className="p-4 border-b border-[#e8ecf0] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
              style={{ backgroundColor: `${community.color}15`, border: `1px solid ${community.color}25` }}
            >
              {community.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Text fw={700} size="sm" className="text-[#1a202c]">{community.name}</Text>
                <Text size="sm" c="dimmed">›</Text>
                <div className="flex items-center gap-1">
                  <IconHash size={13} style={{ color: community.color }} />
                  <Text size="sm" fw={600} style={{ color: community.color }}>{channel.name}</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <IconUsersGroup size={11} className="text-gray-400" />
                  <Text size="xs" c="dimmed">{community.members.toLocaleString()} members</Text>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-[7px] h-[7px] rounded-full bg-[#4caf50]" />
                  <Text size="xs" c="dimmed">
                    {Math.floor(community.members * 0.04)} active now
                  </Text>
                </div>
                <Show when={channel.description}>
                  {desc => (
                    <>
                      <Text size="xs" c="dimmed">·</Text>
                      <Text size="xs" c="dimmed" lineClamp={1}>{desc}</Text>
                    </>
                  )}
                </Show>
              </div>
            </div>
          </div>
          <Tooltip label={showLeaderboard ? "Hide leaderboard" : "Show leaderboard"} position="left">
            <ActionIcon
              size="sm"
              variant={showLeaderboard ? "filled" : "subtle"}
              color={showLeaderboard ? "cyan" : "gray"}
              radius="xl"
              onClick={() => setShowLeaderboard(v => !v)}
            >
              <IconDots size={15} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>

      <div
        className="px-4 py-2 flex-shrink-0 flex items-center gap-2"
        style={{ background: `${community.color}08`, borderBottom: `1px solid ${community.color}18` }}
      >
        <IconPin size={11} style={{ color: community.color }} />
        <Text size="xs" c="dimmed">
          <span style={{ color: community.color }} className="font-semibold">Pinned:</span>{" "}
          Welcome to <strong>#{channel.name}</strong>! Keep discussions aligned with Dharmic values. 🙏
        </Text>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-[#e8ecf0]" />
          <Text size="xs" c="dimmed" fw={500}>Today</Text>
          <div className="flex-1 h-px bg-[#e8ecf0]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 rounded-[14px] overflow-hidden border border-[#e8ecf0]"
          style={{ background: "linear-gradient(135deg, #fdf8f0, #f0f9fb)" }}
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <IconSparkles size={13} style={{ color: "#d4a843" }} />
            <Text size="xs" fw={700} style={{ color: "#d4a843", letterSpacing: "0.06em" }}>DAILY SHLOKA</Text>
          </div>
          <div className="px-4 pb-3">
            <Text size="sm" fw={600} className="text-[#2d3748] leading-relaxed" style={{ fontStyle: "italic" }}>
              "{DAILY_SHLOKA.text}"
            </Text>
            <Text size="xs" c="dimmed" className="mt-1">{DAILY_SHLOKA.translation}</Text>
            <Text size="xs" fw={500} style={{ color: "#d4a843" }} className="mt-1">— {DAILY_SHLOKA.source}</Text>
          </div>
        </motion.div>

        <div className="flex flex-col gap-1">
          <Show
            when={messages.length > 0}
            fallback={
              <div className="py-12 text-center">
                <Text size="sm" c="dimmed">Be the first to say something in <strong>#{channel.name}</strong>! 🙏</Text>
              </div>
            }
          >
            {messages.map((msg, i) => {
              const sender = getUserById(msg.senderId);
              if (!sender) return null;
              const prev = messages[i - 1];
              const isFirstInGroup = i === 0 || prev.senderId !== msg.senderId;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(isFirstInGroup && i > 0 ? "mt-3" : "")}
                >
                  <div className={cn("flex gap-2 items-start", msg.isOwn ? "flex-row-reverse" : "flex-row")}>
                    {isFirstInGroup ? (
                      <Avatar src={sender.avatar} size={32} radius="xl" className="flex-shrink-0 mt-[18px]" />
                    ) : (
                      <div className="w-8 flex-shrink-0" />
                    )}

                    <div className="max-w-[72%]">
                      <Show when={isFirstInGroup}>
                        <div className={cn("flex items-center gap-2 mb-1", msg.isOwn ? "flex-row-reverse" : "flex-row")}>
                          <Text size="xs" fw={700} style={{ color: msg.isOwn ? community.color : "#2d3748" }}>
                            {msg.isOwn ? "You" : sender.name}
                          </Text>
                          <Text size="xs" c="dimmed">{msg.timestamp}</Text>
                        </div>
                      </Show>

                      <div
                        className={cn("px-3 py-2 inline-block max-w-full", msg.isOwn ? "text-white" : "bg-[#f0f2f5] text-[#1a202c]")}
                        style={{
                          borderRadius: msg.isOwn ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                          backgroundColor: msg.isOwn ? community.color : undefined,
                        }}
                      >
                        <Text size="sm" style={{ lineHeight: 1.55 }}>{msg.content}</Text>
                      </div>

                      <Show when={(msg.reactions ?? []).length > 0}>
                        <div className={cn("flex flex-wrap gap-1 mt-1.5", msg.isOwn ? "justify-end" : "justify-start")}>
                          {(msg.reactions ?? []).map(reaction => (
                            <motion.button
                              key={reaction.emoji}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onToggleReaction(msg.id, reaction.emoji)}
                              className="flex items-center gap-1 px-2 py-[2px] rounded-full cursor-pointer text-[12px]"
                              style={{
                                border: reaction.reacted ? `1.5px solid ${community.color}` : "1.5px solid #e2e8f0",
                                background: reaction.reacted ? `${community.color}12` : "#f8f9fb",
                              }}
                            >
                              <span>{reaction.emoji}</span>
                              <span
                                className="font-semibold text-[11px]"
                                style={{ color: reaction.reacted ? community.color : "#718096" }}
                              >
                                {reaction.count}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </Show>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Show>
          <div ref={endRef} />
        </div>
      </div>

      <div className="p-4 border-t border-[#e8ecf0] flex-shrink-0">
        <div className="border-[1.5px] border-[#e2e8f0] rounded-[14px] bg-[#fafbfc] overflow-hidden">
          <div className="flex items-center px-3 py-2">
            <div className="flex items-center gap-1 mr-2">
              <Tooltip label="Emoji" position="top">
                <ActionIcon size="sm" variant="subtle" color="gray" radius="xl" onClick={() => toast.info("Emoji picker coming soon!")}>
                  <IconMoodSmile size={15} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Attach file" position="top">
                <ActionIcon size="sm" variant="subtle" color="gray" radius="xl" onClick={() => toast.info("File sharing coming soon!")}>
                  <IconPaperclip size={15} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Mention" position="top">
                <ActionIcon size="sm" variant="subtle" color="gray" radius="xl" onClick={() => toast.info("@ mentions coming soon!")}>
                  <IconAt size={15} />
                </ActionIcon>
              </Tooltip>
            </div>

            <Input
              variant="unstyled"
              placeholder={`Message #${channel.name}...`}
              value={newMessage}
              onChange={e => onNewMessage(e.currentTarget.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) onSend(); }}
              className="flex-1"
              size="sm"
              classNames={{ input: "text-[13px]" }}
            />

            <div className="flex items-center gap-1">
              <ActionIcon size="sm" variant="subtle" color="gray" radius="xl">
                <IconMicrophone size={15} />
              </ActionIcon>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ActionIcon
                  size="md"
                  radius="xl"
                  onClick={onSend}
                  style={{
                    background: newMessage.trim()
                      ? `linear-gradient(135deg, ${community.color}, ${community.color}cc)`
                      : "#e8ecf0",
                    color: newMessage.trim() ? "white" : "#a0aec0",
                    transition: "all 0.2s",
                  }}
                >
                  <IconSend size={14} />
                </ActionIcon>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-shrink-0 border-l border-[#e8ecf0] flex flex-col overflow-hidden"
            style={{ background: "#fafbfc" }}
          >
            <div className="px-4 py-3 border-b border-[#e8ecf0] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <IconTrophy size={14} style={{ color: community.color }} />
                <Text size="xs" fw={700} style={{ color: "#1a202c", letterSpacing: "0.04em" }}>LEADERBOARD</Text>
              </div>
              <ActionIcon size="xs" variant="subtle" color="gray" radius="xl" onClick={() => setShowLeaderboard(false)}>
                <IconX size={12} />
              </ActionIcon>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
              {leaderboardMembers.length === 0 ? (
                <Text size="xs" c="dimmed" className="text-center mt-6">No data yet</Text>
              ) : (
                leaderboardMembers.map(({ user, kp }, idx) => {
                  const level = getKarmaLevel(kp);
                  const isCurrentUser = user.id === "u1";
                  const medals = ["🥇", "🥈", "🥉"];
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex items-center gap-2.5 p-2 rounded-xl"
                      style={{
                        background: isCurrentUser ? `${community.color}10` : idx === 0 ? "#fffbeb" : "white",
                        border: isCurrentUser ? `1.5px solid ${community.color}30` : "1.5px solid #f0f2f5",
                      }}
                    >
                      <div className="text-base w-5 text-center flex-shrink-0">
                        {idx < 3 ? medals[idx] : <span className="text-xs text-gray-400 font-bold">#{idx + 1}</span>}
                      </div>
                      <Avatar src={user.avatar} size={28} radius="xl" className="flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <Text size="xs" fw={700} truncate style={{ color: "#1a202c" }}>
                          {isCurrentUser ? "You" : user.name.split(" ")[0]}
                        </Text>
                        <Badge
                          size="xs"
                          variant="dot"
                          style={{ color: level.color, borderColor: level.color, fontSize: 9, padding: "0 4px" }}
                        >
                          {level.name}
                        </Badge>
                      </div>
                      <Text size="xs" fw={700} style={{ color: community.color, whiteSpace: "nowrap" }}>
                        {kp.toLocaleString()} KP
                      </Text>
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2 border-t border-[#e8ecf0] flex-shrink-0">
              <Text size="xs" c="dimmed" className="text-center">Top contributors this month</Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

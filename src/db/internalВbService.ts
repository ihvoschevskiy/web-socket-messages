import { User } from "../types/user";

export type UserWithRoom = User & { roomId: string };
export const userMap = new Map<string, UserWithRoom>();

export const getUsersCountInRoom = (roomId: string): number =>
  [...userMap.values()].filter((item) => item.roomId === roomId).length;

export const getFirstAvatars = (count: number): string[] =>
  [...userMap.values()]
    .filter((item) => item.avatar)
    .slice(0, count)
    .map((item) => item.avatar);

export const setUser = (
  userSocketId: string,
  user: User,
  roomId: string
): void => {
  userMap.set(userSocketId, { ...user, roomId });
};

export const deleteUser = (userSocketId: string): void => {
  userMap.delete(userSocketId);
};

export const getRoomIdBySocketId = (socketId: string): null | string => {
  const user = userMap.get(socketId);
  return user ? user.roomId : null;
};

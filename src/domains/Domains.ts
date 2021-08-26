export type Friend = {
  name: string;
};

export interface IUser {
  name: string;
  friends: Array<Friend>;
}

export const defaultUsers: Array<IUser> = [];

export const defaultUser: IUser = { name: '', friends: [] };

export interface IUserModel {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  contact: string;
}

export interface IReplyTweetModel {
  replyId: string;
  reply: string;
  replyDate: string;
  repliedBy: IUserModel;
  tags: string[];
}

export interface ITweetModel {
  tweetId: string;
  tweet: string;
  tweetDate: string;
  tweetedBy: IUserModel;
  likeCount: number;
  tags: string[];
  replies: IReplyTweetModel[];
}

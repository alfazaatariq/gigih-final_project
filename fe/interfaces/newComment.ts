interface NewComment {
  _videoId: string;
  _userId: string;
  profilePicture: string;
  isAnon: boolean;
  username: string;
  comment: string;
}

export default NewComment;

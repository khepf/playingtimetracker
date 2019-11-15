export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  dateString: string;
  baseImageName: string;
  articleType: ArticleType;
  isFavourite: boolean;
}

export enum ArticleType {
  TopStory = 'TOP_STORY',
  CodeExample = 'CODE_EXAMPLE'
}


// Store root state
export interface RootState {
  topToolbar: TopToolbarState;
  user: UserState;
  players: PlayersState;
}

// Store modules state
export interface TopToolbarState {
  title: string;
}

// User modules state
export interface UserState {
  user: {
    loggedIn: boolean,
    data: any
  };
}

// Players modules state
export interface PlayersState {
  players: {};
  player: {
    firstName: string,
    lastName: string,
    jerseyNumber: number
  };
}

// Teams modules state
export interface TeamsState {
  teams: {};
  team: {
    teamName: string,
    members: string,
  };
}

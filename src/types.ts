export type VOTE = {
  partyId: number;
  partyName: string;
  vote: number;
};

export type VOTE_PARLIAMENTARIAN = {
  partyId: number;
  partyName: string;
  vote: number;
  parliamentarianCount: number;
  oneParliamentarianCount: number;
};

export type CITY = {
  id: number;
  name: string;
  voterCountTotal: number;
  votesCountTotal: number;
  votesCountValid: number;
  votesCountInvalid: number;
  votes: VOTE[];
  // bagimsiz_toplam_oy: number;
  union1Vote: number;
  union2Vote: number;
  parliamentarianCount: number;
};

export type CITY_TOTAL = CITY & {
  abroadVotes: number;
  votesTotal: VOTE[];
};

import { CITY_TOTAL } from "../types";
import { cities1 } from "./cities1";
import { abroadPartyRatios, abroadVoteRatio } from "./ratios";

export const cities2: CITY_TOTAL[] = cities1.map((x) => ({
  ...x,
  abroadVotes: Math.round(x.votesCountValid * abroadVoteRatio),
  votesTotal: JSON.parse(JSON.stringify(x.votes)),
}));

cities2.forEach((x) => {
  x.votesTotal.forEach((y, i) => {
    if (0 < y.partyId) y.vote = y.vote + Math.round(x.abroadVotes * abroadPartyRatios[i]);
  });
});

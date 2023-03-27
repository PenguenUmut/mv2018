import { VOTE /* , VOTE_PARLIAMENTARIAN */ } from "./types";

/* export const parliamentarianCount = (votes: VOTE[], totalParliamentarian: number): VOTE_PARLIAMENTARIAN[] => {
  const result: VOTE_PARLIAMENTARIAN[] = JSON.parse(JSON.stringify(votes));
  result.forEach((x) => {
    x.parliamentarianCount = 0;
    x.oneParliamentarianCount = 0;
  });
  const newVotes: VOTE[] = JSON.parse(JSON.stringify(votes));

  for (let i = 0; i < totalParliamentarian; i++) {
    newVotes.sort((a, b) => b.vote - a.vote);
    const winnerVote = newVotes[0];
    // console.log("winnerVote", winnerVote);

    const resultResult = result.find((x) => x.partyId === winnerVote.partyId);
    if (resultResult) {
      resultResult.oneParliamentarianCount = Math.ceil(resultResult.vote / (resultResult.parliamentarianCount + 1));
      resultResult.parliamentarianCount++;
      winnerVote.vote = Math.ceil(resultResult.vote / (resultResult.parliamentarianCount + 1));
    }
  }

  return result.sort((a, b) => b.vote - a.vote);
};
 */

export type PartyRowResult = {
  partyId: number;
  partyName: string;
  vote: number;
  won: boolean;
};

export const parliamentarianCountV2 = (votes: VOTE[], totalParliamentarian: number): PartyRowResult[][] => {
  const result: PartyRowResult[][] = [];

  /** init table columns and rows */
  const cloneVotes: VOTE[] = JSON.parse(JSON.stringify(votes));
  cloneVotes.sort((a, b) => b.vote - a.vote);
  for (let i = 0; i < totalParliamentarian; i++) {
    result.push(cloneVotes.map((x) => ({ partyId: x.partyId, partyName: x.partyName, vote: x.vote, won: false })));
  }

  for (let i = 0; i < result.length; i++) {
    const newRow = result[i];
    const sortNewRow: PartyRowResult[] = JSON.parse(JSON.stringify(newRow));
    sortNewRow.sort((a, b) => b.vote - a.vote);
    const winnerParty: PartyRowResult = sortNewRow[0];

    // console.log("winnerParty", winnerParty);
    const winnerRow: PartyRowResult | undefined = newRow.find((x) => x.partyId === winnerParty.partyId);
    if (winnerRow) {
      winnerRow.won = true;

      let winnerPartyWonCount = 0;
      result.forEach((r) => {
        if (r.some((y) => y.partyId === winnerParty.partyId && y.won)) {
          winnerPartyWonCount++;
        }
      });
      const winnerPartyFirstVotes = cloneVotes.find((x) => x.partyId === winnerParty.partyId)?.vote || 0;

      for (let j = i + 1; j < result.length; j++) {
        const updateRow = result[j];
        const updatePartyCell = updateRow.find((x) => x.partyId === winnerParty.partyId);
        if (updatePartyCell) {
          updatePartyCell.vote = Math.ceil(winnerPartyFirstVotes / (winnerPartyWonCount + 1));
        }
      }
    }
  }

  return result;
};

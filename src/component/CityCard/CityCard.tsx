import React, { useMemo, useState } from "react";
import { CITY_TOTAL } from "../../types";
import { /* parliamentarianCount, */ parliamentarianCountV2 } from "../../utils";
import "./CityCard.css";

export const CityCard: React.FC<{ city: CITY_TOTAL }> = ({ city }) => {
  const [withAboard, setWithAboard] = useState<boolean>(true);

  const voteParliamentarians = useMemo(
    () => parliamentarianCountV2(withAboard ? city.votesTotal : city.votes, city.parliamentarianCount),
    [city.parliamentarianCount, city.votes, city.votesTotal, withAboard]
  );

  const minVoteCount: number = useMemo(() => {
    let result = 10000000000;
    voteParliamentarians[0].forEach((x) => {
      const t = voteParliamentarians.reduce((p, c) => c.find((o) => o.partyId === x.partyId && o.won)?.vote || p, 0);
      if (0 < t) {
        result = Math.min(result, t);
      }
    });
    return result;
  }, [voteParliamentarians]);

  const residualVotes: number[] = useMemo(() => {
    let result: number[] = [];
    voteParliamentarians[0].forEach((x, i) => {
      const t = voteParliamentarians.reduce((p, c) => p + c.filter((o) => o.partyId === x.partyId && o.won).length, 0);

      let r = voteParliamentarians[0][i].vote - t * minVoteCount;
      r = r < 0 ? 0 : r;
      result.push(r);
    });
    return result;
  }, [minVoteCount, voteParliamentarians]);

  const totalVoters = useMemo(() => (withAboard ? city.voterCountTotal + city.abroadVotes : city.voterCountTotal), [city.abroadVotes, city.voterCountTotal, withAboard]);
  const votes = useMemo(() => (withAboard ? city.votesCountTotal + city.abroadVotes : city.votesCountTotal), [city.abroadVotes, city.votesCountTotal, withAboard]);
  const votesValid = useMemo(() => (withAboard ? city.votesCountValid + city.abroadVotes : city.votesCountValid), [withAboard, city.votesCountValid, city.abroadVotes]);

  const representationPercent = useMemo(() => {
    const representationVoteCount = city.parliamentarianCount * minVoteCount;
    return Math.round((representationVoteCount / totalVoters) * 100);
  }, [city.parliamentarianCount, minVoteCount, totalVoters]);

  const residualVotesCount = useMemo(() => {
    return votesValid - city.parliamentarianCount * minVoteCount;
  }, [city.parliamentarianCount, minVoteCount, votesValid]);

  const residualVotesPercent = useMemo(() => {
    return Math.round((residualVotesCount / totalVoters) * 100);
  }, [residualVotesCount, totalVoters]);

  return (
    <div className="city-card">
      <h2>
        {city.name} ({city.parliamentarianCount} mv x {minVoteCount} oy)
      </h2>
      <table className="ctable">
        <thead>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </thead>
        <tbody>
          <tr>
            <td className="c1">
              <b>Toplam Seçmen</b>
            </td>
            <td className="c2">{totalVoters}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: "100%" }}>
                <span>100%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <b>Kullanılan Oy</b>
            </td>
            <td className="c2">{votes}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: 100 * (votes / totalVoters) + "%" }}>
                <span>{Math.ceil(100 * (votes / totalVoters))}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <b>Geçerli Oy</b>
            </td>
            <td className="c2">{votesValid}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: 100 * (votesValid / totalVoters) + "%" }}>
                <span>{Math.ceil(100 * (votesValid / totalVoters))}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <b>Temsiliyet Oy</b>
            </td>
            <td className="c2">{city.parliamentarianCount * minVoteCount}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: representationPercent + "%" }}>
                <span>{representationPercent}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <b>Artık Oy</b>
            </td>
            <td className="c2">{residualVotesCount}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: residualVotesPercent + "%" }}>
                <span>{residualVotesPercent}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <input type="checkbox" id={"checkbox" + city.name} checked={withAboard} onChange={(e) => setWithAboard(e.target.checked)} />
              <label htmlFor={"checkbox" + city.name}>
                <b>Yurtdışı</b>
              </label>
            </td>
            <td className="c2">{city.abroadVotes}</td>

            <td className="c3">
              <div className="c3_bar" style={{ width: withAboard ? 100 * (city.abroadVotes / city.voterCountTotal) + "%" : "0" }}>
                <span>{Math.ceil(100 * (city.abroadVotes / city.voterCountTotal))}%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div className="table-scroll">
        <table className="ctable3">
          <thead>
            <tr>
              <td className="center">
                <b>Milletvekili</b>
              </td>
              {voteParliamentarians[0].map((x) => (
                <td className={"center " + x.partyName}>
                  <b>{x.partyName}</b>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {voteParliamentarians.map((row, i) => (
              <tr key={"keyi" + i}>
                <td className="center bold">{i + 1}.</td>
                {row.map((c, j) => (
                  <td key={"keyj" + j} className={c.won ? "right won bold" : "right"}>
                    {c.vote}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td className="center bold">MV Başına Oy</td>
              {voteParliamentarians[0].map((x) => (
                <td className="right won">
                  <span className="mvvotecount">{voteParliamentarians.reduce((p, c) => c.find((o) => o.partyId === x.partyId && o.won)?.vote || p, 0) || ""}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="center bold">MV Sayısı</td>
              {voteParliamentarians[0].map((x) => (
                <td className="right">
                  <span className="mvcount">{voteParliamentarians.reduce((p, c) => p + c.filter((o) => o.partyId === x.partyId && o.won).length, 0) || ""}</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="center bold">Artık Oy</td>
              {residualVotes.map((x) => (
                <td className="right">
                  <span className="rscount">{x}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

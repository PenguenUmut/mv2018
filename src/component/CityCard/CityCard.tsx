import React from "react";
import { CITY } from "../../types";
import { /* parliamentarianCount, */ parliamentarianCountV2 } from "../../utils";
import "./CityCard.css";

export const CityCard: React.FC<{ city: CITY }> = ({ city }) => {
  /* const voteParliamentarians = parliamentarianCount(city.votes, city.parliamentarianCount); */
  const voteParliamentarians2 = parliamentarianCountV2(city.votes, city.parliamentarianCount);

  return (
    <div style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 10, margin: 15, padding: 15 }}>
      <h2>
        {city.name} ({city.parliamentarianCount} Milletvekili)
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
            <td className="c2">{city.voterCountTotal}</td>
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
            <td className="c2">{city.votesCountTotal}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: 100 * (city.votesCountTotal / city.voterCountTotal) + "%" }}>
                <span>{Math.ceil(100 * (city.votesCountTotal / city.voterCountTotal))}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="c1">
              <b>Geçerli Oy</b>
            </td>
            <td className="c2">{city.votesCountValid}</td>
            <td className="c3">
              <div className="c3_bar" style={{ width: 100 * (city.votesCountValid / city.voterCountTotal) + "%" }}>
                <span>{Math.ceil(100 * (city.votesCountValid / city.voterCountTotal))}%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      {/* <table className="ctable2">
        <thead>
          <tr>
            <td className="center">
              <b>Parti</b>
            </td>
            <td className="center">
              <b>Oy Sayısı</b>
            </td>
            <td className="center">
              <b>MV Sayısı</b>
            </td>
            <td className="center">
              <b>MV Başına Oy Sayısı</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {voteParliamentarians.map((voteParliamentarian, k) => (
            <tr key={"keyk" + k}>
              <td className={voteParliamentarian.partyName}>{voteParliamentarian.partyName}</td>
              <td className="right">{voteParliamentarian.vote}</td>
              <td className="center">{voteParliamentarian.parliamentarianCount > 0 ? voteParliamentarian.parliamentarianCount : null}</td>
              <td className="center">{voteParliamentarian.oneParliamentarianCount > 0 ? voteParliamentarian.oneParliamentarianCount : null}</td>

              <br />
            </tr>
          ))}
        </tbody>
      </table>
       */}
      <table className="ctable3">
        <thead>
          <tr>
            <td className="center">
              <b>Milletvekili</b>
            </td>
            {voteParliamentarians2[0].map((x) => (
              <td className={"center " + x.partyName}>
                <b>{x.partyName}</b>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {voteParliamentarians2.map((row, i) => (
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
            {voteParliamentarians2[0].map((x) => (
              <td className="right won">
                <span className="mvvotecount">{voteParliamentarians2.reduce((p, c) => c.find((o) => o.partyId === x.partyId && o.won)?.vote || p, 0) || ""}</span>
              </td>
            ))}
          </tr>

          <tr>
            <td className="center bold">MV Sayısı</td>
            {voteParliamentarians2[0].map((x) => (
              <td className="right">
                <span className="mvcount">{voteParliamentarians2.reduce((p, c) => p + c.filter((o) => o.partyId === x.partyId && o.won).length, 0) || ""}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

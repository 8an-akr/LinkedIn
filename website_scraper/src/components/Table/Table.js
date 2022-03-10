import "./Table.css";

const Table = ({ people }) => {
  return (
    <table className="table">
      <thead className="row header">
        <tr>
          <th className="th name-col">Name</th>
          <th className="th email-col">Email</th>
          <th className="th company-col">Company</th>
          <th className="th running-col">Running</th>
        </tr>
      </thead>
      {people.map((person) => {
        let name = person.Name;
        let nameArr = name.split(" ");
        // console.log(name);
        let rows = (
          <tr className="row" key={person.Name}>
            <td className="td name-col">{person.Name}</td>
            <td className="td email-col">
              {nameArr[0]} {nameArr[1]}@{person.Domain}
            </td>
            <td className="td company-col">{person.Company}</td>
            <td className="td running-col">{person.Ads}</td>
          </tr>
        );
        if (nameArr.length > 2) {
          console.log(nameArr[0]);
          debugger;
          let nows = (
            <tr className="row" key={person.Name}>
              <td className="td name-col">{person.Name}</td>
              <td className="td email-col">
                {nameArr[0]} {nameArr[2]} @ {person.Domain}
              </td>
              <td className="td company-col">{person.Company}</td>
              <td className="td running-col">{person.Ads}</td>
            </tr>
          );
          console.log(nows);
          return rows, nows;
        }
        console.log(rows);
        return rows;
      })}
    </table>
  );
};

export default Table;

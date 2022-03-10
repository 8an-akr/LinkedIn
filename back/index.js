function linkedinScrapper() {
  const format = "f.last";
  const domain = "google.com";
  const running = "Google Adsense";

  const url = window.location.href;
  const companyName = company();

  let personJobs = [];

  function company() {
    if (url.includes("https://www.linkedin.com/company/")) {
      try {
        return document.getElementsByTagName("h1")[0].innerText;
      } catch (error) {}
    } else if (url.includes("https://www.linkedin.com/sales/")) {
      try {
        return document.querySelector('[data-anonymize="company-name"]')
          .innerText;
      } catch (error) {}
    } else {
      console.log("ERROR: doesnt contain company name.");
    }
  }

  function getName(i) {
    if (url.includes("https://www.linkedin.com/company/")) {
      try {
        return document.querySelectorAll(
          ".org-people-profile-card__profile-title.t-black.lt-line-clamp.lt-line-clamp--single-line.ember-view"
        )[i].innerText;
      } catch (error) {}
    } else if (url.includes("https://www.linkedin.com/sales/")) {
      try {
        return document.querySelectorAll('[data-anonymize="person-name"]')[i]
          .innerText;
      } catch (error) {}
    } else {
      console.log("ERROR: doesnt contain sales or company. wrong URL");
    }
  }

  function getRole(i) {
    if (url.includes("https://www.linkedin.com/company/")) {
      try {
        const newRole = document.querySelectorAll(
          ".lt-line-clamp.lt-line-clamp--multi-line.ember-view:not(.t-16):not(.t-bold)"
        )[i].childNodes[1].data;
        return newRole;
      } catch (error) {}
    } else if (url.includes("https://www.linkedin.com/sales/")) {
      try {
        let newRole = document.querySelectorAll(
          ".result-lockup__highlight-keyword"
        )[i].innerText;
        if (newRole.includes("\n")) {
          oldRole = newRole.split("\n");
          newRole = `${oldRole[0]}`;
        }
        return newRole;
      } catch (error) {}
    } else {
      console.log("ERROR: doesnt contain sales or company. wrong URL");
    }
  }

  function user(userName, role) {
    return {
      Url: url,
      Name: userName,
      Role: role,
    };
  }

  function howMany() {
    try {
      if (url.includes("https://www.linkedin.com/company/")) {
        return document.querySelectorAll(".artdeco-entity-lockup__title")
          .length;
      } else if (url.includes("https://www.linkedin.com/sales/")) {
        return document.querySelectorAll("dl").length;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getList() {
    try {
      const numOfPeople = howMany();
      for (let i = 0; i < numOfPeople; i++) {
        if (getName(i) == undefined) {
          continue;
        }
        personJobs.push(user(getName(i), getRole(i)));
      }
    } catch (error) {
      personJobs;
    }
    console.log(personJobs);
    if (localStorage.getItem("list")) {
      let oldList = JSON.parse(localStorage.getItem("list"));
      oldList.push(...personJobs);
      localStorage.setItem("list", JSON.stringify(oldList));
    } else {
      localStorage.setItem("list", JSON.stringify(personJobs));
    }
  }

  getList();
}
linkedinScrapper();
console.log(JSON.parse(localStorage.getItem("list")));

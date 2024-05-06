import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Loaddata from "./load-data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import defaultimg from "../Images/default.jpg";
export default function Showdata(props) {
  const [sta, setStat] = useState([]);
  const [fill, fildt] = useState([]);
  const [launchs, setlaunch] = useState([]);
  const [land, setland] = useState([]);
  const [query, setQuery] = useState();
  const [year, setYear] = useState([]);
  const [launch, launchobj] = useState();
  const state = Loaddata();
  useEffect(() => {
    //Load Full api data
    setStat(state.Year); //all api
    setlaunch(state.launch); //Launch year api
    setland(state.land); //land success api
    //get path
    let path = window.location.href;
    let path2 = window.location.search;
    //get value when press back button on browser
    window.onpopstate = () => {
      let path = window.location.href;
      let path4 = path.split("/")[path.split("/").length - 1];
      setQuery(path4);
      //Remove class
      $(`#menu-year li`).removeClass("active");
      $(`#menu-launch li`).removeClass("active");
      $(`#menu-lands li`).removeClass("active");
    };
    //Check Path
    let path3 = path2.split("?")[path2.split("?").length - 1];
    launchobj(path3);
    if (launch === "Launchtrue") {
      //Show Loading
      if (launchs.length === 0) {
        $("#loader").show().css({ display: "flex" });
        $("#root").addClass("is_blir");
      }
      //Remove Loading
      else {
        $("#loader").hide().css({ display: "none" });
        $("#root").removeClass("is_blir").addClass("showdata");
        fildt(launchs);
      }
      //Remove Duplicate Year
      const dc = sta.map((a) => a.launch_year);
      const new_year = [...new Set(dc)];
      setYear(new_year);
      $(`#menu-launch li:eq(0)`).addClass("active");
    }
    //check path
    else if (launch === "Launchfalse") {
      //Remove Duplicate Year
      const dc = sta.map((a) => a.launch_year);
      const new_year = [...new Set(dc)];
      setYear(new_year);
      const arr = sta.filter((data) => {
        return data.launch_success === false;
      });
      //Show loading
      if (arr.length === 0) {
        $("#loader").show().css({ display: "flex" });
        $("#root").addClass("is_blir");
      }
      //Remove loading
      else {
        $("#loader").hide().css({ display: "none" });
        $("#root").removeClass("is_blir").addClass("showdata");
        fildt(arr);
      }
      $(`#menu-launch li:eq(1)`).addClass("active");
    }
    //check Path
    else if (launch === "landtrue") {
      //Remove Duplicate Year
      const dc = sta.map((a) => a.launch_year);
      const new_year = [...new Set(dc)];
      setYear(new_year);
      //show loading
      if (land.length === 0) {
        $("#loader").show().css({ display: "flex" });
        $("#root").addClass("is_blir");
      }
      //Remove Loading
      else {
        $("#loader").hide().css({ display: "none" });
        $("#root").removeClass("is_blir").addClass("showdata");
        fildt(land);
      }
      $(`#menu-lands li:eq(0)`).addClass("active");
    }
    //Check path
    else if (launch === "landfalse") {
      //Remove Duplicate Year
      const dc = sta.map((a) => a.launch_year);
      const new_year = [...new Set(dc)];
      setYear(new_year);
      //Load default page data when not give any year of filter
      const arr = sta.filter((data) => {
        return data.rocket.first_stage.cores.find((cate) => {
          return cate.land_success === false;
        });
      });
      //Show Loading
      if (arr.length === 0) {
        $("#loader").show().css({ display: "flex" });
        $("#root").addClass("is_blir");
      }
      //Remove Loading
      else {
        $("#loader").hide().css({ display: "none" });
        $("#root").removeClass("is_blir").addClass("showdata");
        fildt(arr);
      }
      $(`#menu-lands li:eq(1)`).addClass("active");
    } else {
      //check Path
      let path4 = path.split("/")[path.split("/").length - 1];
      // setState when send filter(query)
      if (
        path4 === "Breif-data?Launchfalse" ||
        path4 === "Breif-data?Launchtrue" ||
        path4 === "Breif-data?landtrue" ||
        path4 === "Breif-data?landfalse"
      ) {
        setQuery("");
      } else {
        setQuery(path4);
      }
      //check Path
      if (query === "" || path4 === "Breif-data") {
        //show loading
        if (sta.length === 0) {
          $("#loader").show().css({ display: "flex" });
          $("#root").addClass("is_blir");
        }
        //Remove Loading
        else {
          $("#loader").hide().css({ display: "none" });
          $("#root").removeClass("is_blir").addClass("showdata");
        }
        //get year in api
        const sd = sta.map((a) => {
          return a.launch_year;
        });
        //Remove Duplicate Year
        const new_year = [...new Set(sd)];
        setYear(new_year);
        fildt(sta);
      } else {
        $("#right").show();
        $("#error").hide();
        //aplly filer in year
        const arr = sta.filter((data) => {
          return data.launch_year === query;
        });
        //show loading
        if (arr.length === 0) {
          $("#loader").show().css({ display: "flex" });
          $("#root").addClass("is_blir");
        }
        //remove loading
        else {
          $("#loader").hide().css({ display: "none" });
          $("#root").removeClass("is_blir").addClass("showdata");
          fildt(arr);
        }
        //get year in api
        const sd = sta.map((a) => {
          return a.launch_year;
        });
        //Remove Duplicate Year
        const new_year = [...new Set(sd)];
        setYear(new_year);
        //get index value to apply class in year
        let index = new_year.indexOf(path4);
        $(`#menu-year li:eq(${index})`).addClass("active");
      }
    }
  }, [launch, state.Year, query, sta, state.land, state.launch, launchs, land]);
  //set year When click
  const Setyear = (e) => {
    let aa = e.target.dataset.year;
    let bb = e.target.dataset.index;
    setQuery(aa);
    $(`#menu-year li`).removeClass("active");
    $(`#menu-year li:eq(${bb})`).addClass("active");
    $(`#menu-launch li`).removeClass("active");
    $(`#menu-lands li`).removeClass("active");
  };
  //set Launch when click
  const Launch = (e) => {
    let val = e.target.dataset.value;
    let aa = e.target.dataset.index;
    $(`#menu-lands li`).removeClass("active");
    $(`#menu-launch li`).removeClass("active");
    $(`#menu-launch li:nth-child(${aa})`).addClass("active");
    if (query === "") {
      const arr = sta.filter((data) => {
        return data.launch_success === JSON.parse(val);
      });
      fildt(arr);
    } else {
      // console.log(query)
      const arr = sta.filter((data) => {
        return data.launch_year === query;
      });
      const arr1 = arr.filter((data) => {
        return data.launch_success === JSON.parse(val);
      });
      if (arr1.length === 0) {
        let aa = $("#left").innerHeight();
        $("#error").show().height(aa);
        $("#right").hide();
      } else {
        $("#right").show();
        fildt(arr1);
        $("#error").hide();
      }
    }
  };
  //set land when click
  const Lands = (e) => {
    let val = e.target.dataset.value;
    let aa = e.target.dataset.index;
    $(`#menu-launch li`).removeClass("active");
    $(`#menu-lands li`).removeClass("active");
    $(`#menu-lands li:nth-child(${aa})`).addClass("active");
    if (query === "") {
      const arr = sta.filter((data) => {
        return data.rocket.first_stage.cores.find((dt) => {
          return dt.land_success === JSON.parse(val);
        });
      });
      fildt(arr);
    } else {
      const arr = sta.filter((data) => {
        return data.launch_year === query;
      });
      const arr1 = arr.filter((data) => {
        return data.rocket.first_stage.cores.find((dt) => {
          return dt.land_success === JSON.parse(val);
        });
      });
      if (arr1.length === 0) {
        let aa = $("#left").innerHeight();
        $("#error").show().height(aa);
        $("#right").hide();
      } else {
        $("#right").show();
        $("#error").hide();
        fildt(arr1);
      }
    }
  };
  const title = `SpaceX Launch Programs ${query}`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header>
        <div className="grid-12 pt-1">
          <h1>SpaceX Launch Programs</h1>
        </div>
      </header>
      <section className="main">
        <div className="grid-12 p-1">
          <div className="grid-2" id="left">
            <h2>Filters</h2>
            <div className="grid-12 year-title">
              <h3>Launch Year</h3>
            </div>
            <ul className="years" id="menu-year">
              {year.map((a, b) => {
                return (
                  <li key={b}>
                    <Link
                      data-year={a}
                      data-index={b}
                      onClick={Setyear}
                      to={`/Breif-data/${a}`}
                    >
                      {a}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="grid-12 year-title">
              <h3>Successful Launch</h3>
            </div>
            <ul className="all" id="menu-launch">
              <li data-value="true" onClick={Launch} data-index="1">
                True
              </li>
              <li data-value="false" onClick={Launch} data-index="2">
                False
              </li>
            </ul>
            <div className="grid-12 year-title">
              <h3>Successful Landing </h3>
            </div>
            <ul className="all" id="menu-lands">
              <li data-value="true" onClick={Lands} data-index="1">
                True
              </li>
              <li data-value="false" onClick={Lands} data-index="2">
                False
              </li>
            </ul>
          </div>
          <div className="grid-10" id="error" style={{ display: "none" }}>
            <div className="er">
              <img src={require("../Images/nodata.png").default} alt=""></img>{" "}
            </div>
          </div>
          <div className="grid-10" id="right">
            {fill.map((a, b) => {
              return (
                <div className="grid-3" key={b}>
                  <div className="grid-view">
                    <div className="avtar">
                      <LazyLoadImage
                        placeholderSrc={defaultimg}
                        src={a.links.mission_patch_small}
                        alt={a.mission_name}
                        effect="blur"
                      />
                    </div>
                    <h1>{a.mission_name}</h1>
                    <ul className="details">
                      <li>Mission Ids :</li>
                      <li>{a.mission_id}</li>
                      <li>Launch Year :</li>
                      <li>{a.launch_year}</li>
                      <li>Successful Launch :</li>
                      <li>{String(a.launch_success)}</li>
                      <li>Successful Landing :</li>
                      <li>
                        {a.rocket.first_stage.cores.map((a, b) => {
                          return <span key={b}>{String(a.land_success)}</span>;
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

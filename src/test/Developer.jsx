import React from "react";
import '../css/Developer.css';


const Developer = () => {

  let city = "I live in mumbai";

  let result;

  function test() {
    // [...city].forEach(fe => result[fe] = result[fe] + 1 || 1);
    // result = new Set([...city]);
    // result = [...city].filter((fil, index, arr) => arr.indexOf(fil) === index);
    // result = city.split(' ')[city.split(' ').length - 1].length;
    result = city.split(' ').map((data) => {
      return [...data][data.length - 1];
    }).join('');
  };

  test();

  console.log(result);

  return (
    <>
      {/* <p>Nitin</p>
      <p id="surname">Nadar</p>
      <p className="role">FrontEnd Developer</p>
      <section>
        <p>2.6 Years of Exp.</p>
        <div>
          <p>Worked on 3 Projects</p>
        </div>
      </section> */}
      {/* <h1 id="unique-title">This is a unique heading</h1>
      <p className="highlight">This paragraph is highlighted.</p>
      <p className="highlight">This paragraph is also highlighted.</p> */}
      {/* <div className="hidden-box">This is hidden but still takes up space.</div>
      <div className="none-box">This is completely removed.</div>
      <p>This text is below both divs.</p> */}
      {/* <div className="box box1"></div>
      <div className="box box2"></div> */}
      {/* <button className="button">Click Me</button>
      <p>This is a paragraph. The first letter will be larger and red.</p> */}
      {/* <div className="box">This is a box</div> */}
      {/* <div className="content-box">Content-box (Total width = 250px)</div>
      <div className="border-box">Border-box (Total width = 200px)</div> */}
    </>
  );
};

export default Developer
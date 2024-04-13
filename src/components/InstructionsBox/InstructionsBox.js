function InstructionsBox({headerText, left}) {
    const marginValue = {
      marginLeft: left ? '350px' : '50px',
      marginRight: left ? '50px' : '350px',
    };
  
    return (
      <div className="outer-box d-flex flex-column" style={{ ...marginValue }}>
        <div className="headers text-white text-decoration-underline">{headerText}</div>
        <div className="inner-box">
          <p>Use the specifications box to the right to enter the recipe you want.</p>
          <p>Don’t know yet? No worries! Instead specify what you want your meal to consist of and we can recommend recipes you’re sure to love!</p>
          <p>Once ready, click the search for recipe button to get recipes.</p>
        </div>
      </div>
    );
}

export default InstructionsBox;
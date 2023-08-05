function Headers() {
  return (
    <div className="header-container">
      <h2 className="title"></h2>
      <label htmlFor="file-upload" className="button">
        Choose Video
      </label>
      <input type="file" style={{ display: "none" }} id="file-upload" />
    </div>
  );
}

export { Headers };

function KanjiSVG({ svgData }: { svgData: any }) {
  if (!svgData) {
    return null;
  }

  console.log(svgData);

  return (
    <div>
      <h1>Kanji Character</h1>
      <div dangerouslySetInnerHTML={{ __html: svgData }}></div>
    </div>
  );
}

export default KanjiSVG;


function ConditionalRender({ index, children }: { index: number, children: any[]; }) {
  return (
    <div>
      {children[index]}
    </div>
  );
}

export default ConditionalRender;
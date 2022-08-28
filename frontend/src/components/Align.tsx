
function Align({ left, right, top, bottom, style, children }: { left?: number, right?: number, top?: number, bottom?: number, style?: React.CSSProperties, children: any; }) {
  return (
    <div style={{ ...base, ...style }}>
      <div style={{ flexGrow: left ?? 1 }} />
      <div style={column}>
        <div style={{ flexGrow: top ?? 1 }} />
        <div>
          {children}
        </div>
        <div style={{ flexGrow: bottom ?? 1 }} />
      </div>
      <div style={{ flexGrow: right ?? 1 }} />
    </div>
  );
}

const base: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  height: '100%'
};

const column: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
};

export default Align;
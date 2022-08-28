
function Center({ className, style, children }: { className?: string, style?: React.CSSProperties, children: any; }) {
  return (
    <div className={className} style={{ ...center, ...style }}>
      {children}
    </div>
  );
}

const center: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default Center;
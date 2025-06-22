export const CustomYAxisTick = ({ x, y, payload }: any) => {
  const profileUrl = payload.value || '/static/default-profile.png'

  return (
    <g transform={`translate(${x}, ${y})`}>
      <image
        href={profileUrl}
        x={-35} // desplaza la imagen un poco a la izquierda
        y={-15}
        width={30}
        height={30}
        clipPath="circle(15px at center)"
      />
    </g>
  )
}

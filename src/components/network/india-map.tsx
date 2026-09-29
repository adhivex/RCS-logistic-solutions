import { citiesServed, homeBase, type City } from "@/content";
import { MAP_HEIGHT, MAP_WIDTH, indiaPath, odishaPath, projectPoint } from "./india-map-data";

/**
 * docs/03-pages.md → /network: map of India with Odisha highlighted and served cities
 * marked. Inline SVG, no map library. India's outline is Natural Earth's India
 * point-of-view boundary (public domain).
 */
export function IndiaMap({ cities = citiesServed }: { cities?: City[] }) {
  const base = projectPoint(homeBase.lon, homeBase.lat);
  const described = cities.length > 0 ? `, and ${cities.length} cities served` : "";

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="img"
        aria-labelledby="india-map-title"
        className="h-auto w-full"
      >
        <title id="india-map-title">
          {`Map of India with Odisha highlighted, the home base at ${homeBase.name}${described}`}
        </title>
        <path
          d={indiaPath}
          className="fill-paper stroke-[#b9c2ce]"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d={odishaPath}
          className="fill-orange/85 stroke-orange-deep"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {cities.map((city) => {
          const { x, y } = projectPoint(city.lon, city.lat);
          return (
            <g key={city.name}>
              <circle cx={x} cy={y} r={4} className="fill-ink stroke-white" strokeWidth={1.5} />
              <text x={x + 7} y={y + 4} className="fill-ink font-body text-[11px] font-medium">
                {city.name}
              </text>
            </g>
          );
        })}
        <circle cx={base.x} cy={base.y} r={12} className="fill-ink/20" />
        <circle cx={base.x} cy={base.y} r={6} className="fill-ink stroke-white" strokeWidth={2} />
      </svg>
      <figcaption className="mt-3 flex items-center gap-2 text-sm text-muted">
        <span aria-hidden="true" className="inline-block size-3 rounded-full bg-ink ring-2 ring-white" />
        Home base: {homeBase.name}, {homeBase.state}
      </figcaption>
    </figure>
  );
}

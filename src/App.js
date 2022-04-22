import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3'
import './App.css'
const width = window.innerWidth;
const height = window.innerHeight - 10;

const generateDataset = () => (
    Array(10000).fill(100).map((i) => ([
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
        `#${Math.floor(Math.random()*16777215).toString(16)}`
    ]))
)

export default function App() {
    const [dataset, setDataset] = useState(
        generateDataset()
    )
    const ref = useRef()

    useEffect(() => {

        console.log("mounted");

        return () => {
            const svgElement = d3.select(ref.current)

            const wrapper = svgElement.select('.wrapper');

            const nodes = svgElement.select('.nodes')

            nodes.selectAll(".node")
                .data(dataset)
                .join("g")
                .attr('class', 'node')
                .append('circle')
                .attr("cx", d => d[0])
                .attr("cy", d => d[1])
                .attr("r",  10)
                .attr("stroke",  d => d[2]);

            const zoom = d3.zoom()
                .on('zoom', (ev) => handleZoom(ev, wrapper))
                .scaleExtent([0.04, 2.5]); // 4% min zoom level to max 250%

            svgElement.call(zoom)
        };


    }, [])

    const handleZoom = (ev, wrapper) => {
        console.log(ev)
        const { transform } = ev;
        wrapper.attr('transform', transform)
            .attr('data-scale', transform.k)
            .attr('data-x', transform.x)
            .attr('data-y', transform.y);
    }

  return (
      <>
        <svg
            width={width}
            height={height}
            ref={ref}
        >
            <g className="wrapper" transform-origin="top left">
                <g className='nodes' />
            </g>
        </svg>
      </>
  );
}

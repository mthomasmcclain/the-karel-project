<template>
  <svg
    :viewBox="`0 0 ${viewBoxW} ${viewBoxH}`"
    style="overflow: hidden;"
    @mouseleave="resetEditModes"
    preserveAspectRatio="xMinYMin meet"
  >

    <!-- Layover for hover over to show controls -->
    <template v-for="n in nRows" :key="`row-${n}`">
      <template v-for="m in nCols" :key="`col-${m}`">
        <rect
          :x="10*(m-1)" :y="10*(n-1)"
          width="10" height="10"
          fill="transparent"
          @mousemove="editRow=n; editCol=m; editWallR=null; editWallC=null; editWallD=null;"
        />
      </template>
    </template>
    
    <!-- WORLD BORDER -- top-left top-right bottom-right bottom-left close. Path positioned just inside viewBox for no cutoff-->
    <path
      :d="`M${borderWidth/2},${borderWidth/2} 
      ${viewBoxW-borderWidth/2},${borderWidth/2} 
      ${viewBoxW-borderWidth/2},${viewBoxH-borderWidth/2} 
      ${borderWidth/2},${viewBoxH-borderWidth/2} 
      z
      `"
      fill="none"
      stroke="black"
      :stroke-width="borderWidth"
    />
      
    <!-- BOX CENTER MARKERS -->
    <template v-for="(x,r) in nRows">
      <circle
        v-for="(y,c) in nCols"
        :key="`marker-${r}-${c}`"
        cx="5" cy="5" r="0.3"
        fill="darkgrey"
        :style="`transform: translate(${100*c/nCols}%, ${100*r/nRows}%);`"
      />
    </template>

    <!-- WALLS -->
    <line v-for="wall in eastWalls" :key="`east-wall-${wall.r}-${wall.c}`"
      :x1="(wall.c + 1) * 10"
      :y1="wall.r * 10"
      :x2="(wall.c + 1) * 10"
      :y2="(wall.r + 1) * 10"
      stroke="black"
      stroke-width="0.2"
    />
    <line v-for="wall in northWalls" :key="`north-wall-${wall.r}-${wall.c}`"
      :x1="wall.c * 10"
      :y1="wall.r * 10"
      :x2="(wall.c + 1) * 10"
      :y2="wall.r * 10"
      stroke="black"
      stroke-width="0.2"
    />
      
    <!-- CELL DIVIDERS AND GUIDES FOR DRAWING WALLS -->
    <template v-for="(x,r) in nRows" :key="`guide-row-${r}`">
      <template v-for="(y,c) in nCols" :key="`guide-row-${c}`">
        <g :transform="`translate(${c * 10}, ${r * 10})`">
          <!-- Internal Cell Divider Lines (always present) -->
          <line
            v-if="r < nRows - 1"
            x1="0" y1="10" x2="10" y2="10"
            stroke="rgba(0,0,0,0.05)"
            :stroke-width="borderWidth"
          />
          <line
            v-if="c < nCols - 1"
            x1="10" y1="0" x2="10" y2="10"
            stroke="rgba(0,0,0,0.05)"
            :stroke-width="borderWidth"
          />
          <!-- Horizontal Guide Lines on Hover -->
          <g
            v-if="r < nRows - 1"
            @click="toggleWall(r + 1, c, 'North')"
          >
            <path
              d="M 0 10 L 2 8 L 8 8 L 10 10 L 8 12 L 2 12 Z"
              fill="transparent"
              @mousemove="editWallR = r + 1; editWallC = c; editWallD = 'North'; editRow=null; editCol=null;"
              
            />
            <line  x1="0.3" y1="10"   x2="9.7" y2="10"
              pointer-events="none"
              stroke-width="0.2"
              stroke-dasharray="0.5"
              :stroke="editWallR === r+1 && editWallC === c && editWallD ==='North' ? 'coral' : 'transparent'"
            />
          </g>
          <!-- Vertical Guide Lines on Hover -->
          <g
            v-if="c < nCols - 1"
            @click="toggleWall(r , c, 'East')"
          >
            <path
              d="M 10 0 L 8 2 L 8 8 L 10 10 L 12 8 L 12 2 Z"
              fill="transparent"
              @mousemove="editWallR = r ; editWallC = c; editWallD = 'East'; editRow=null; editCol=null;"
              
            />
            <line  x1="10" y1="0.3"   x2="10" y2="9.7"
              pointer-events="none"
              stroke-width="0.2"
              stroke-dasharray="0.5"
              :stroke="editWallR === r && editWallC === c && editWallD ==='East' ? 'coral' : 'transparent'"
            />
          </g>
        </g>
      </template>
    </template>

    <!-- STONES -->
    <SvgPositioner v-for="stone in stones"
      :key="`stones-${stone.r}-${stone.c}`"
      anchor="center center"
      :xPos="5 + 10*stone.c"
      :yPos="5 + 10*stone.r"
      :w="7.5"
      @mousemove="editRow=stone.r+1; editCol=stone.c+1; editWallR=null; editWallC=null; editWallD=null;"
    >
      <StoneAndNumber :n="stone.n > 1 ? stone.n : null" />
    </SvgPositioner>
      
    <!-- KAREL -->
    <SvgPositioner
      :w="5"
      anchor="center center"
      :xPos="5 + karelCol*10"
      :yPos="5 + karelRow*10"
      :rotation="rotation"
      @click="toggleKarel(karelRow, karelCol)"
    >
      <KarelVueSvg />
    </SvgPositioner>
                      
    <!-- EDIT CONTROLS -->
    <template v-for="(x,r) in nRows">
      <template v-for="(y,c) in nCols">
        <g
          :key="`group-${r}-${c}`"
          v-if="x===editRow && y===editCol"
          :transform="`translate(${c * 10}, ${r * 10})`"
        >
          <!-- Karel Ghost (if karel not in square) -->
          <SvgPositioner
            v-if="!(r === karelRow && c === karelCol)"
            :xPos="5" :yPos="5" w="5"
            :rotation="rotation"
            anchor="center center"
            style="opacity: 0.35;"
            @click="toggleKarel(r, c)"
            >
            <KarelVueSvg />
          </SvgPositioner>

          <!-- Rotation Icon on Karel if in Square -->
          <SvgPositioner
            :xPos="5" :yPos="5" h="1.75"
            anchor="center center"
            @click="toggleKarel(r, c)"
          >
            <RotationIconBox />
          </SvgPositioner>
          
          <!-- minus button -->
          <SvgPositioner
            :xPos="5-1.6" :yPos="8" h="2"
            anchor="center bottom"
            @click="decrementStones(r, c)"
            >
            <PlusMinusBox symbol="minus" />
          </SvgPositioner>
          
          <!-- plus button -->
          <SvgPositioner
            :xPos="5 + 1.6"  :yPos="8" h="2"
            anchor="center bottom"
            @click="incrementStones(r, c)"
            >
            <PlusMinusBox symbol="plus" />
          </SvgPositioner>
          
        </g>
      </template>
    </template>
                      
  </svg>
</template>

<script>
import SvgPositioner from '../../../SvgPositioner.vue'
import PlusMinusBox from './PlusMinusBoxVueSvg.vue'
import RotationIconBox from './RotationIconVueSvg.vue'
import StoneAndNumber from './StoneAndNumberVueSvg.vue'
import KarelVueSvg from '../../../../assets/KarelVueSvg.vue'
export default {
  components: {
    SvgPositioner,
    PlusMinusBox,
    RotationIconBox,
    StoneAndNumber,
    KarelVueSvg,
  },
  props: {
    borderWidth: {
      type: Number,
      required: false,
      default: 0.35,
    },
    world: {
      type: Object,
      required: true
    }
  },
  data() {
    const { nCols, nRows, karelRow, karelCol, karelDir, walls, stones } = this.world
    return {
      nCols, nRows, karelRow, karelCol, karelDir, walls, stones,
      editRow: null,
      editCol: null,
      editWallR: null,
      editWallC: null,
      editWallD: null,
    }
  },
  watch: {
    world: { // when world prop changes, re-align inner states
      deep: true,
      handler(val) {
        const { nCols, nRows, karelRow, karelCol, karelDir, walls, stones } = val
        this.nCols = nCols
        this.nRows = nRows
        this.karelRow = karelRow
        this.karelCol = karelCol
        this.karelDir = karelDir
        this.walls = walls
        this.stones = stones
      }
    }
  },
  methods: {
    emitChange() {
      const { nCols, nRows, karelRow, karelCol, karelDir, walls, stones } = this
      this.$emit('change', { nCols, nRows, karelRow, karelCol, karelDir, walls, stones })
    },
    resetEditModes() {
      this.editRow = null
      this.editCol = null
      this.editWallR = null
      this.editWallC = null
      this.editWallD = null
    },
    numStones(r, c) {
      const index = this.stones.findIndex(stone => stone.r === r && stone.c === c)
      if (index > -1) return this.stones[index].n
      else return 0
    },
    decrementStones(r, c) {
      const index = this.stones.findIndex(stone => stone.r === r && stone.c === c)
      if (index > -1) {
        this.stones[index].n -= 1
        if (this.stones[index].n === 0) this.stones.splice(index, 1)
        this.emitChange()
      }
    },
    incrementStones(r, c) {
      const index = this.stones.findIndex(stone => stone.r === r && stone.c === c)
      if (index > -1) this.stones[index].n += 1
      else this.stones.push({ r, c, n: 1 })
      this.emitChange()
    },
    toggleKarel(r, c) {
      const nextDirectionMap = { North: 'East', East: 'South', South: 'West', West: 'North' }
      if (this.karelRow === r && this.karelCol === c) {
        this.karelDir = nextDirectionMap[this.karelDir]
      } else {
        this.karelRow = r
        this.karelCol = c
      }
      this.emitChange()
    },
    toggleWall(r, c, d) {
      const index = this.walls.findIndex(wall => wall.r === r && wall.c === c && wall.d === d)
      if (index > -1) {
        this.walls.splice(index, 1)
        this.walls = [ ...this.walls ]
      } else {
        this.walls.push({ r, c, d })
      }
      this.emitChange()
    }
  },
  computed: {
      viewBoxW() { return this.nCols * 10 },
      viewBoxH() { return this.nRows * 10 },
      eastWalls()  { return this.walls.filter(wall => wall.d.toLowerCase() === 'east' )},
      northWalls() { return this.walls.filter(wall => wall.d.toLowerCase() === 'north')},
      rotation() {
          if (!this.karelDir) return 0
          const dir = this.karelDir.toLowerCase();
          if (dir === 'south') return 0
          else if (dir === 'west') return 90
          else if (dir === 'north') return 180
          else if (dir === 'east') return 270
          else return 0
      },
  }, // end computed
};
</script>
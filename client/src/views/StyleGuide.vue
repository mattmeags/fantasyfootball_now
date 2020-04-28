<template>
    <div class="style-guide">
        <h1 class="type--h1">Style Guide</h1>
        <section class="colors">
            <h2 class="type--h2">Colors</h2>
            <div class="color-tiles">
                <h3 class="type--h2">UI Colors</h3>
                <ColorTile v-for="color in mainColors" :key="color" :colorClass="color"></ColorTile>
                
                <h3 class="type--h2">Team Colors</h3>
                <ColorTile v-for="team in teams" v-bind:key="team" v-bind:colorClass="team"></ColorTile>
            </div>
        </section>
        <section class="headings">
            <h2 class="type--h2">Headings</h2>
            <h1 class="type--h1">Heading 1</h1>
            <h2 class="type--h2">Heading 2</h2>
            <h3 class="type--h3">Heading 3</h3>
        </section>
        <section class="typography">
            <span>Typography: Roboto </span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
        <section class="links">
            <h2 class="type--h2">Links</h2>
            TODO: add navigation link here
            <!--<a href="#">Primary Link</a>
            <footer><a href="#">Footer Link</a></footer>-->
        </section>
        <section class="buttons">
            <h2 class="type--h2">Buttons</h2>
            <Btn>Primary Button</Btn>
            <br/>
            <Btn buttonType='secondary'>Secondary Button</Btn>
            <br/>
            <Btn :isDisabled="true" button>Disabled Buttons</Btn>
            <br/>
        </section>
        <section class="icons">
            <h2 class="type--h2">Icons</h2>
            <p>This app utilizes Eva icons. For additional icons look <a href="https://akveo.github.io/eva-icons/#/">here</a></p>
            <eva-icon name="home"></eva-icon>
            <eva-icon name="people"></eva-icon>
            <eva-icon name="award"></eva-icon>
            <eva-icon name="pie-chart-2"></eva-icon>
            <eva-icon name="menu-outline"></eva-icon>
            <eva-icon name="arrow-ios-back-outline"></eva-icon>
            <eva-icon name="close-outline"></eva-icon>
            <eva-icon name="arrow-ios-back-outline"></eva-icon>
            <eva-icon name="arrow-ios-downward-outline"></eva-icon>
            <eva-icon name="arrow-ios-upward-outline"></eva-icon>
        </section>
        <section class="forms">
            <h2 class="type--h2">Form Elements</h2>
            <h3 class="type--h3">Select</h3>
            <div class="white-bg" style="max-width: 100px; margin: 0 auto">
                <ChartFilter defaultOption='test' :filterValues="[1, 2, 3]"></ChartFilter>
            </div>
            
        </section>
        <section class="widgets">
            <h2 class="type--h2">Widgets</h2>
            <!-- <h3 class="type--h3">Tabs</h3> -->
            <section>
                <h3 class="type--h2">Loader</h3>
                <div class="relative loader-container">
                    <Loading></Loading>
                </div>
            </section>
            
            <section>
                <h3 class="type--h2">Tables</h3>
                <TableVis v-bind:header="['heading 1', 'heading 2', 'heading 3', 'heading 4']" v-bind:tableData="[{a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}]"></TableVis>
            </section>
            <section>
                <h3 class="type--2">Charts</h3>
            <!-- <div class="container"> -->
                <Row>
                    <Tile tileClass="w-3">
                        <template v-slot:data>
                            <Number title="Touchdowns by Andrew" descriptor="Andrew Luck" number="39"></Number>
                        </template>
                    </Tile>
                    <Tile tileClass="w-3">
                        <template v-slot:header>
                            <TileHeader title="Donut Chart"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <DonutSplit :labels="['Player 1', 'Player 2', 'Player 3']" :values="['22', '54', '13']"></DonutSplit>
                        </template>
                    </Tile>
                    <Tile tileClass="w-3">
                        <template v-slot:header>
                            <TileHeader title="Bar Chart"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <Bar :labels="['Player 1', 'Player 2', 'Player 3']" :values="[{data: ['22', '54', '13']}]"></Bar>
                        </template>
                    </Tile>
                    <Tile tileClass="w-3">
                        <template v-slot:header>
                            <TileHeader title="Horizontal Bar Chart"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <Bar :labels="['Player 1', 'Player 2', 'Player 3']" :values="[{data: ['22', '54', '13']}]" :isHorizontal="true"></Bar>
                        </template>
                    </Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-6">
                        <template v-slot:header>
                            <TileHeader title="Stacked Bar Chart"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <StackedBar :labels="['Player 1', 'Player 2', 'Player 3', 'Player 4']" :values="[{data:['2', '4','1', '7'], name:'Value 1'}, {data:['6', '11', '8', '2'], name: 'Value 2',}] "></StackedBar>
                        </template>
                    </Tile>
                    <Tile tileClass="w-6">
                        <template v-slot:header>
                            <TileHeader title="Compare Bar Chart"></TileHeader>
                        </template>
                        <template v-slot:data>
                            <CompareBar :labels="['Player 1', 'Player 2', 'Player 3', 'Player 4']" :values="[{data:['2', '4','1', '7']}, {data:['6', '11', '8', '2'],}]"></CompareBar>
                        </template>>
                    </Tile>
                </Row>
            <!-- </div> -->

            </section>
            
        </section>

        <section class="tiles">
            <div class="tile"></div>
        </section>
        <section class="grid">
            <h2 class="type--h2">Grid</h2>
            <Dashboard>
                <!--TODO: h-2 class do anything?-->
                <Row>
                    <Tile tileClass="w-12 h-2"> w-12</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-11 h-1">w-11</Tile>
                    <Tile tileClass="w-1 h-1">w-1</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-10 h-2">w-10</Tile>
                    <Tile tileClass="w-2 h-2">w-2</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-9 h-1">w-9</Tile>
                    <Tile tileClass="w-3 h-1">w-3</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-8 h-1">w-8</Tile>
                    <Tile tileClass="w-4 h-1">w-4</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-7 h-1">w-7</Tile>
                    <Tile tileClass="w-5 h-1">w-5</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-6 h-1">w-6</Tile>
                    <Tile tileClass="w-6 h-1">w-6</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-4 h-1">w-4</Tile>
                    <Tile tileClass="w-4 h-1">w-4</Tile>
                    <Tile tileClass="w-4 h-1">w-4</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-3 h-1">w-3</Tile>
                    <Tile tileClass="w-3 h-1">w-3</Tile>
                    <Tile tileClass="w-3 h-1">w-3</Tile>
                    <Tile tileClass="w-3 h-1">w-3</Tile>
                </Row>
                <Row>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                    <Tile tileClass="w-2 h-1">w-2</Tile>
                </Row>
                <Row rowClass="tall">
                    <StackedCharts stackedClass="w-3">
                        <Tile>
                            <template v-slot:data>
                                1
                            </template>
                        </Tile>
                        <Tile>
                            <template v-slot:data>
                                1
                            </template>
                        </Tile>
                    </StackedCharts>
                    <Tile tileClass="w-9 h-1"></Tile> 
                </Row>
            </Dashboard>
        </section>
    </div>
</template>

<script>
    import ColorTile from '@/components/styleguide/ColorTile.vue';
    import ChartFilter from '@/components/global/controls/ChartFilter.vue';
    import Loading from '@/components/global/Loading.vue';
    import TableVis from '@/components/data/TableVis.vue'
    import Number from '@/components/data/Number.vue';
    import DonutSplit from '@/components/data/DonutSplit.vue';
    import CompareBar from '@/components/data/CompareBar.vue';
    import Bar from '@/components/data/Bar.vue';
    import StackedBar from '@/components/data/StackedBar.vue';
    import Btn from '@/components/global/controls/Btn.vue';
    import TileHeader from '@/components/global/layout/TileHeader.vue';

    export default {
        name: 'StyleGuide',
        components: {
            ColorTile,
            ChartFilter,
            Loading,
            TableVis,
            Number,
            DonutSplit,
            Btn,
            CompareBar,
            Bar,
            StackedBar,
            TileHeader
        }, 
        data: () => ({
            teams: ['cardinals','falcons' ,'ravens' ,'bills' ,'panthers' ,'bears' ,'bengals' ,'browns' ,'cowboys' ,'broncos' ,'lions' ,'packers' ,'texans' ,'colts','chiefs' ,'chargers' ,'rams' ,'dolphins' ,'vikings' ,'patriots' ,'saints' ,'giants', 'raiders' ,'eagles', 'steelers', 'niners', 'seahawks', 'buccaneers', 'titans', 'redskins'],
            mainColors: ['primary', "secondary", "tietary", "accent", "accent2", "accent3", "accent4", "black", "white"], 
        })

    }
</script>

<style lang="scss" scoped>
    @import '@/assets/styles';

    .style-guide {
        text-align: center;
        width: calc(100% - #{$nav-width});
        position: relative;
        left: $nav-width;
        padding: 0 50px;
        box-sizing: border-box;
    }
    section:not(:last-of-type) {
        margin-bottom: 20px;
    }
    .color-tiles,
    .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        h3,
        h2,
        button  {
            flex-basis: 100%;
        }

        h3,
        h2 {
            text-align: center;
        }
    }

    .primary-bg {
        background: $primary;
        border: $border;
    }

    .accent-bg {
        background: $accent;
    }

    .accent2-bg {
        background: $accent2;
    }

    .accent3-bg {
        background: $accent3;
    }

    .accent4-bg {
        background: $accent4;
    }

    .secondary-bg {
        background: $secondary;
    }

    .tietary-bg {
        background: $tietary;
    }

    .black-bg {
        background: $black;
    }

    .white-bg {
        background: $white;
    }

    .relative {
        position: relative;
    }

    .loader-container {
        height: 250px;
    }

    .tile {
        min-height: 20px;
    }

</style>
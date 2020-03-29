<template>
    <div class="style-guide">
        <h1>Style Guide</h1>
        <section class="colors">
            <h2 class="type--h2">Colors</h2>
            <div class="color-tiles">
                <h3 class="type--h3">UI Colors</h3>
                <ColorTile colorClass="primary"></ColorTile>
                <ColorTile colorClass="secondary"></ColorTile>
                <ColorTile colorClass="tietary"></ColorTile>
                <ColorTile colorClass="accent"></ColorTile>
                <ColorTile colorClass="accent2"></ColorTile>
                <ColorTile colorClass="accent3"></ColorTile>
                <ColorTile colorClass="accent4"></ColorTile>
                <ColorTile colorClass="black"></ColorTile>
                <ColorTile colorClass="white"></ColorTile>
                
                <h3 class="type--h3">Team Colors</h3>
                <ColorTile v-for="team in teams" v-bind:key="team" v-bind:colorClass="team"></ColorTile>
            </div>
        </section>
        <section class="headings">
            <h2 class="type--h2">Headings</h2>
            <h1 class="type--h1">Heading 1</h1>
            <h2 class="type--h2">Heading 2</h2>
            <h3 class="type--h3">Heading 3</h3>
            <h4 class="type--h4">Heading 4</h4>
        </section>
        <section class="typography">
            <span>Typography: Roboto </span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
        <section class="links">
            <h2 class="type--h2">Links</h2>
            <a href="#">Primary Link</a>
            <!-- <nav><a href="#">Nav Link</a></nav> -->
            <footer><a href="#">Footer Link</a></footer>
        </section>
        <section class="buttons">
            <h2 class="type--h2">Buttons</h2>
            <button>Primary Button</button>
            <br/>
            <button class="secondary">Secondary Button</button>'
            <br/>
            <button disabled>Disabled Buttons</button>
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
            <form>
                <input type="text"/>
                <input type="text"/>
                <ChartFilter></ChartFilter>
                <textarea></textarea>
            </form>
        </section>
        <section class="widgets">
            <h2 class="type--h2">Widgets</h2>
            <h3 class="type--h3">Tabs</h3>
            <section>
                <h3 class="type--h3">Loader</h3>
                <Loading></Loading>
            </section>
            
            <h3 class="type--h3">Tables</h3>
            <TableVis v-bind:header="['heading 1', 'heading 2', 'heading 3', 'heading 4']" v-bind:tableData="[{a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}, {a: 'Item 1', b: 'Item 2', c: 'Item 3', d: 'Item 4'}]"></TableVis>
            <h3 class="type--h3">charts</h3>
            <!-- <div class="container"> -->
                <div class="row">
                    <div class="tile w-3">
                        <Number title="Touchdowns by Andrew" descriptor="Andrew Luck" number="39"></Number>
                    </div>
                    <div class="tile w-3">
                        <DonutSplit :labels="['Player 1', 'Player 2', 'Player 3']" :values="['22', '54', '13']"></DonutSplit>
                    </div>
                </div>
            <!-- </div> -->
            
            
        </section>
        <section class="tiles">
            <div class="tile"></div>
        </section>
        <section class="grid">
            <h2 class="type--h2">Grid</h2>
            <div class="container">
                <div class="row">
                    <div class="tile w-12 h-2"> w-12</div>
                </div>
                <div class="row">
                    <div class="tile w-11 h-1">w-11</div>
                    <div class="tile w-1 h-1">w-1</div>
                </div>
                <div class="row">
                    <div class="tile w-10 h-2">w-10</div>
                    <div class="tile w-2 h-2">w-2</div>
                </div>
                <div class="row">
                    <div class="tile w-9 h-1">w-9</div>
                    <div class="tile w-3 h-1">w-3</div>
                </div>
                <div class="row">
                    <div class="tile w-8 h-1">w-8</div>
                    <div class="tile w-4 h-1">w-4</div>
                </div>
                <div class="row">
                    <div class="tile w-7 h-1">w-7</div>
                    <div class="tile w-5 h-1">w-5</div>
                </div>
                <div class="row">
                    <div class="tile w-6 h-1">w-6</div>
                    <div class="tile w-6 h-1">w-6</div>
                </div>
                <div class="row">
                    <div class="tile w-4 h-1">w-4</div>
                    <div class="tile w-4 h-1">w-4</div>
                    <div class="tile w-4 h-1">w-4</div>
                </div>
                <div class="row">
                    <div class="tile w-3 h-1">w-3</div>
                    <div class="tile w-3 h-1">w-3</div>
                    <div class="tile w-3 h-1">w-3</div>
                    <div class="tile w-3 h-1">w-3</div>
                </div>
                <div class="row">
                    <div class="tile w-2 h-1">w-2</div>
                    <div class="tile w-2 h-1">w-2</div>
                    <div class="tile w-2 h-1">w-2</div>
                    <div class="tile w-2 h-1">w-2</div>
                    <div class="tile w-2 h-1">w-2</div>
                    <div class="tile w-2 h-1">w-2</div>
                </div>
                <div class="row tall">
                    <div class="tile-stack-container w-3">
                        <div class="tile">1</div>
                        <div class="tile">2</div>
                    </div>
                    <div class="tile w-9 h-1"></div> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import ColorTile from '@/components/styleguide/ColorTile.vue';
    import ChartFilter from '@/components/data/ChartFilter.vue';
    import Loading from '@/components/global/Loading.vue';
    import TableVis from '@/components/data/TableVis.vue'
    import Number from '@/components/data/Number.vue';
    import DonutSplit from '@/components/data/DonutSplit.vue';

    export default {
        name: 'StyleGuide',
        components: {
            ColorTile,
            ChartFilter,
            Loading,
            TableVis,
            Number,
            DonutSplit
        }, 
        data: () => ({
            teams: ['cardinals','falcons' ,'ravens' ,'bills' ,'panthers' ,'bears' ,'bengals' ,'browns' ,'cowboys' ,'broncos' ,'lions' ,'packers' ,'texans' ,'colts','chiefs' ,'chargers' ,'rams' ,'dolphins' ,'vikings' ,'patriots' ,'saints' ,'giants' ,'giants' ,'raiders' ,'eagles', 'steelers', 'niners', 'seahawks', 'buccaneers', 'titans', 'redskins']
        })

    }
</script>

<style lang="scss" scoped>
    @import '../assets/styles/variables';
    @import '../assets/styles/color';
    @import '../assets/styles/buttons';
    @import '../assets/styles/tiles';
    @import '../assets/styles/grid';
    @import '../assets/styles/typography';

    .style-guide {
        text-align: center;
        width: calc(100% - #{$nav-width});
        position: relative;
        left: $nav-width;
        padding: 0 50px;
        box-sizing: border-box;
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

</style>
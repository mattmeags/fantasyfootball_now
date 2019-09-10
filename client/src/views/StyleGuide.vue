<template>
    <main>dfasdfdsfasd
        <h1>Style Guide</h1>
        <section class="colors">
            <h2>Colors</h2>
            <div class="color-tiles">
                <h3>UI Colors</h3>
                <ColorTile colorClass="primary"></ColorTile>
                <ColorTile colorClass="secondary"></ColorTile>
                <ColorTile colorClass="tietary"></ColorTile>
                <ColorTile colorClass="accent"></ColorTile>
                <ColorTile colorClass="accent2"></ColorTile>
                <ColorTile colorClass="accent3"></ColorTile>
                <ColorTile colorClass="accent4"></ColorTile>
                <ColorTile colorClass="black"></ColorTile>
                <ColorTile colorClass="white"></ColorTile>
                
                <h3>Team Colors</h3>
                <ColorTile v-for="team in teams" v-bind:key="team" v-bind:colorClass="team"></ColorTile>
            </div>
        </section>
        <section class="headings">
            <h2>Headings</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
        </section>
        <section class="typography">
            <span>Typography: Roboto </span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
        <section class="links">
            <h2>Links</h2>
            <a href="#">Primary Link</a>
            <nav><a href="#">Nav Link</a></nav>
            <footer><a href="#">Footer Link</a></footer>
        </section>
        <section class="buttons">
            <h2>Buttons</h2>
            <button>Primary Button</button>
            <button class="secondary">Secondary Button</button>
            <button disabled>Disabled Buttons</button>
        </section>
        <section class="icons"></section>
        <section class="forms">
            <form>
                <input type="text"/>
                <input type="text"/>
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <textarea></textarea>
            </form>
        </section>
        <section class="widgets">
            <h2>Widgets</h2>
            <h3>Tabs</h3>
            <h3>Tables</h3>
            <table>
                <thead>
                    <tr>
                        <th>heading 1</th>
                        <th>heading 2</th>
                        <th>heading 3</th>
                        <th>heading 4</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>Item 1</td>
                            <td>Item 2</td>
                            <td>Item 3</td>
                            <td>Item 3</td>
                        </tr>
                        <tr>
                            <td>Item 1</td>
                            <td>Item 2</td>
                            <td>Item 3</td>
                            <td>Item 3</td>
                        </tr>
                        <tr>
                            <td>Item 1</td>
                            <td>Item 2</td>
                            <td>Item 3</td>
                            <td>Item 3</td>
                        </tr>
                        <tr>
                            <td>Item 1</td>
                            <td>Item 2</td>
                            <td>Item 3</td>
                            <td>Item 3</td>
                        </tr>
                    </tbody>
            </table>
            <h3>charts</h3>
        </section>
        <section class="tiles">
            <div class="tile"></div>
        </section>
        <section class="grid">
            <h2>Grid</h2>
            <div class="container">
                <div class="row">
                    <div class="tile w-12 h-2"></div>
                </div>
                <div class="row">
                    <div class="tile w-11 h-1"></div>
                    <div class="tile w-1 h-1"></div>
                </div>
                <div class="row">
                    <div class="tile w-10 h-2"></div>
                    <div class="tile w-2 h-2"></div>
                </div>
                <div class="row">
                    <div class="tile w-9 h-1"></div>
                    <div class="tile w-3 h-1"></div>
                </div>
                <div class="row">
                    <div class="tile w-8 h-1"></div>
                    <div class="tile w-4 h-1"></div>
                </div>
                <div class="row">
                    <div class="tile w-7 h-1"></div>
                    <div class="tile w-5 h-1"></div>
                </div>
                <div class="row">
                    <div class="tile w-6 h-1"></div>
                    <div class="tile w-6 h-1"></div>
                </div>
                <div class="row">
                    <div class="tile w-4 h-1"></div>
                    <div class="tile w-4 h-1"></div>
                    <div class="tile w-4 h-1"></div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import ColorTile from '@/components/styleguide/ColorTile.vue';

    export default {
        name: 'StyleGuide',
        components: {
            ColorTile
        }, 
        data: () => ({
            teams: ['cardinals','falcons' ,'ravens' ,'bills' ,'panthers' ,'bears' ,'bengals' ,'browns' ,'cowboys' ,'broncos' ,'lions' ,'packers' ,'texans' ,'colts','chiefs' ,'chargers' ,'rams' ,'dolphins' ,'vikings' ,'patriots' ,'saints' ,'giants' ,'giants' ,'raiders' ,'eagles', 'steelers', 'niners', 'seahawks', 'buccaneers', 'titans', 'redskins']
        })

    }
</script>

<style lang="scss">
    @import '../../styles/styles';

    main {
        margin-bottom: 300px; 
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

    .tile {
        height: 400px;
        width: 300px;
    }
</style>
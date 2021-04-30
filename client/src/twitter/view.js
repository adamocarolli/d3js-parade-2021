// eslint-disable-next-line import/no-unresolved
import * as d3 from 'https://cdn.skypack.dev/d3';
import {Tweet} from './tweet.js';
import {Link} from './link.js';

export class TwitterView {
    constructor(container, grafer) {
        this.element = container;
        this.grafer = grafer;
        this.tweets = new Map();
        this.removingTweets = new Map();
        this.twttr = window.twttr;
        this.container = this.makeContainer();
        this.header = this.makeHeader();
        this.list = this.makeList();

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'twitter-links-canvas';
        this.element.appendChild(this.canvas);

        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;

        this.context = this.canvas.getContext('2d');

        this.container.appendChild(this.header);
        this.container.appendChild(this.list);
        this.element.appendChild(this.container);

        const style = getComputedStyle(container);
        this.linkColor = style.getPropertyValue('--tweet-to-node').trim();
        this.tweetTheme = style.getPropertyValue('--tweet-theme').trim();

        // Inject aggregation panel
        this.aggregationPane = this.makeEmptyElement('aggregation-pane');
        this.aggregationPane.style.width = '400px';
        this.aggregationPane.style.height = '290px';
        this.aggregationPane.style.background = 'transparent';
        this.aggregationPane.style.position = 'absolute';
        this.aggregationPane.style.bottom = `20px`;
        this.aggregationPane.style.left = '16px';
        this.aggregationPane.style['pointer-events']= 'none';
        document.body.appendChild(this.aggregationPane);


        this.metadataCache = {};
        d3.dsv(',', 'layouts/adam_d3js/inferred/meta.csv').then(data => {
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                this.metadataCache[row.id] = {
                    user: row.user,
                    hashtags: row.hashtags ? row.hashtags.split(' ') : [],
                };
            }
        });
        this.initializeEvents();
    }


    renderAggregationPane(topUsers, topTags) {
        let svg = d3.select('.aggregation-pane').select('svg');
        if (svg.size() === 0) {
            svg = d3.select('.aggregation-pane').append('svg')
              .style('width', '100%')
              .style('height', '100%');

            svg.append('g').classed('users', true)
                .append('text')
                .attr('x', 5)
                .attr('y', 20)
                .style('fill', '#eef2ee')
                .style('font-size', '14px')
                .text('Top users');

            svg.append('g').classed('hashtags', true).attr('transform', 'translate(0, 140)')
                .append('text')
                .attr('x', 5)
                .attr('y', 20)
                .style('fill', '#eef2ee')
                .style('font-size', '14px')
                .text('Top hashtags');
        }

        // Figure out extent
        const userExtent = [0, Math.max(...topUsers.map(d => d[1]))];
        const userXScale = d3.scaleLinear().range([0, 250]).domain(userExtent);
        const tagExtent = [0, Math.max(...topTags.map(d => d[1]))];
        const tagXScale = d3.scaleLinear().range([0, 250]).domain(tagExtent);


        for (let i = 0; i < topUsers.length; i++) topUsers[i].push(i);
        for (let i = 0; i < topTags.length; i++) topTags[i].push(i);

        const userG = svg.select('.users');
        const tagG = svg.select('.hashtags');

        const offset = 20; // magic
        userG.selectAll('.user-row')
          .data(topUsers, d => d[0])
          .join(
              enter => {
                  const row = enter.append('g').classed('user-row', true);
                  row.append('rect')
                    .attr('x', 2)
                    .attr('y', topUsers.length * 22 + 10 + offset)
                    .attr('rx', 3)
                    .attr('ry', 3)
                    .attr('width', d => userXScale(d[1]))
                    .attr('height', 16)
                    .attr('fill-opacity', 0.7)
                    .attr('stroke', null)
                    .attr('fill', '#6da7de')
                    .transition()
                    .duration(800)
                    .attr('y', (d) => (d[2]) * 22 + 10 + offset);

                  row.append('text')
                    .attr('x', 10)
                    .attr('y', (topUsers.length + 1) * 22 + offset)
                    .style('font-size', '12px')
                    .style('fill', '#eef2ee')
                    .text(d => d[0] + ' - ' + d[1])
                    .transition()
                    .duration(800)
                    .attr('y', (d) => (d[2] + 1) * 22 + offset);

              },
              update => {
                  update.select('rect')
                      .transition()
                      .duration(800)
                      .attr('y', (d) => (d[2]) * 22 + 10 + offset)
                      .attr('width', d => userXScale(d[1]));
                  update.select('text')
                      .transition()
                      .duration(800)
                      .attr('y', (d) => (d[2] + 1) * 22 + offset)
                      .text(d => d[0] + ' - ' + d[1]);
              },
              exit => {
                  exit.transition().duration(800).attr('transform', 'translate(-200, 0)').remove();
              }
          );


        tagG.selectAll('.tag-row')
          .data(topTags, d => d[0])
          .join(
              enter => {
                  const row = enter.append('g').classed('tag-row', true);
                  row.append('rect')
                    .attr('x', 2)
                    .attr('y', topTags.length * 22 + 10 + offset)
                    .attr('rx', 3)
                    .attr('ry', 3)
                    .attr('width', d => tagXScale(d[1]))
                    .attr('height', 16)
                    .attr('fill-opacity', 0.7)
                    .attr('stroke', null)
                    .attr('fill', '#f8933a')
                    .transition()
                    .duration(800)
                    .attr('y', (d) => (d[2]) * 22 + 10 + offset);

                  row.append('text')
                    .attr('x', 10)
                    .attr('y', (topTags.length + 1) * 22 + offset)
                    .style('font-size', '12px')
                    .style('fill', '#eef2ee')
                    .text(d => d[0] + ' - ' + d[1])
                    .transition()
                    .duration(800)
                    .attr('y', (d) => (d[2] + 1) * 22 + offset);
              },
              update => {
                  update.select('rect')
                      .transition()
                      .duration(800)
                      .attr('y', (d) => (d[2]) * 22 + 10 + offset)
                      .attr('width', d => tagXScale(d[1]));
                  update.select('text')
                      .transition()
                      .duration(800)
                      .attr('y', (d) => (d[2] + 1) * 22 + offset)
                      .text(d => d[0] + ' - ' + d[1]);
              },
              exit => {
                  exit.transition().duration(800).attr('transform', 'translate(-200, 0)').remove();
              }
          );

        /*
        userRow.append('rect')
          .attr('x', 2)
          .attr('y', (d) => (d[2]) * 22 + 10)
          .attr('rx', 3)
          .attr('ry', 3)
          .attr('width', d => userXScale(d[1]))
          .attr('height', 16)
          .attr('fill-opacity', 0.8)
          .attr('stroke', null)
          .attr('fill', '#27A');

        userRow.append('text')
          .attr('x', 10)
          .attr('y', (d) => (d[2] + 1) * 22)
          .style('font-size', '12px')
          .style('fill', '#eef2ee')
          .text(d => d[0] + ' - ' + d[1]);
        */

        /*
        tagRow.append('rect')
          .attr('x', 2)
          .attr('y', (d) => (d[2]) * 22 + 10)
          .attr('rx', 3)
          .attr('ry', 3)
          .attr('width', d => tagXScale(d[1]))
          .attr('height', 16)
          .attr('fill-opacity', 0.8)
          .attr('stroke', null)
          .attr('fill', '#582');

        tagRow.append('text')
          .attr('x', 10)
          .attr('y', (d) => (d[2] + 1) * 22)
          .style('font-size', '12px')
          .style('fill', '#eef2ee')
          .text(d => d[0] + ' - ' + d[1]);
          */
    }



    initializeEvents() {
        let animationFrame = null;
        const animationCallback = () => {
            this.updateLinksCanvas();
            animationFrame = null;
        };

        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(() => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        });
        observer.observe(this.list, config);

        this.list.addEventListener('scroll', () => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        });

        // monkey patch grafer, ugh
        // at some point the ability to listen for render/update events needs to be added to grafer
        const old_render = this.grafer.controller.viewport.render.bind(this.grafer.controller.viewport);
        this.grafer.controller.viewport.render = () => {
            old_render();
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        };

        // Daniel hack
        const _old_render = this.grafer.controller.viewport._render.bind(this.grafer.controller.viewport);
        this.grafer.controller.viewport._render = () => {
            _old_render();
            const inView = [];
            const blacklist = ['javascript', 'js', 'dataviz'];

            if (this.grafer.controller.viewport.renderMode === 2) {
                // console.log('HELLO DEBOUNCED RENDER', this.grafer.nodes.size);
                for (const node of this.grafer.nodes.values()) {
                    const point = this.grafer.getWorldPointPosition(node.point);
                    const screenPoint = this.grafer.worldToPixel(point);
                    // console.log(point, screenPoint, this.canvas.width, this.canvas.height);
                    if (screenPoint[0] >= 0 && screenPoint[0] <= this.canvas.width) {
                        if (screenPoint[1] >= 0 && screenPoint[1] <= this.canvas.height) {
                            inView.push(node);
                        }
                    }
                    // break;
                }
                if (inView.length > 0) {
                    // console.log('D3 hacking begins', inView.length);
                    const userMap = new Map();
                    const tagMap = new Map();

                    const cache = this.metadataCache;
                    for (let i = 0; i < inView.length; i++) {
                        // Users
                        const key = inView[i].label;
                        if (!cache[key]) continue;

                        const user = cache[key].user;

                        if (!userMap.has(user)) {
                            userMap.set(user, 1);
                        } else {
                            userMap.set(user, userMap.get(user) + 1);
                        }

                        // Hashtags
                        const hashtags = cache[key].hashtags;
                        for (let j = 0; j < hashtags.length; j++) {
                            const tag = hashtags[j];
                            if (blacklist.indexOf(tag) >= 0) continue;
                            if (!tagMap.has(tag)) {
                                tagMap.set(tag, 1);
                            } else {
                                tagMap.set(tag, tagMap.get(tag) + 1);
                            }
                        }
                    }
                    const topUsers = [...userMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
                    const topTags = [...tagMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
                    this.renderAggregationPane(topUsers, topTags);
                }
            }
        };


        // initialize tweet event functions
        this.tweetUpdated = () => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animationCallback);
            }
        };
        this.tweetRemoved = (_, tweet) => {
            tweet.off('updated', this.tweetUpdated);
            tweet.off('removed', this.tweetRemoved);
            if (this.removingTweets.has(tweet.label)) {
                this.removingTweets.delete(tweet.label);
            }
            this.updateLinksCanvas();
        };
    }

    updateLinksCanvas() {
        const listBB = this.list.getBoundingClientRect();
        const size = this.grafer.controller.viewport.size;
        this.context.clearRect(0, 0, size[0], size[1]);
        this.context.strokeStyle = this.linkColor;
        this.context.lineWidth = 3;

        const allTweets = [...this.tweets.values(), ...this.removingTweets.values()];

        for (const info of allTweets) {
            info.link.draw(
                this.context,
                info.tweet,
                listBB,
                size
            );
        }
    }

    async displayTweet(node) {
        if (this.tweets.has(node.label)) {
            this.removeTweet(node.label);
        } else {
            const tweet = new Tweet(this.list, node, this.twttr, this.tweetTheme, () =>{
                this.removeTweet(node.label);
            });

            const point = this.grafer.getWorldPointPosition(node.point);
            const link = new Link(point, this.grafer);
            link.setAnimation('add');
            this.tweets.set(node.label, { tweet, link });

            tweet.on('updated', this.tweetUpdated);
            tweet.on('removed', this.tweetRemoved);
        }
    }

    removeTweet(id) {
        const info = this.tweets.get(id);
        if (info) {
            info.tweet.remove();
            info.link.setAnimation('remove');
            this.tweets.delete(id);
            this.removingTweets.set(info.tweet.label, info);
        }
    }

    clearTweets() {
        for (const info of this.tweets.values()) {
            info.tweet.remove();
            info.link.setAnimation('remove');
            this.removingTweets.set(info.tweet.label, info);
        }
        this.tweets.clear();
    }

    makeEmptyElement(className) {
        const element = document.createElement('div');
        element.className = className;
        return element;
    }

    makeContainer() {
        return this.makeEmptyElement('twitter-panel');
    }

    makeHeader() {
        const header = this.makeEmptyElement('twitter-header');

        const title = this.makeEmptyElement('twitter-header-title');
        title.innerHTML = `
            <svg width="96" height="91" style="position:relative;top:22px;margin-right:5px;">
                <clipPath id="clip">
                <path d="M0,0h7.75a45.5,45.5 0 1 1 0,91h-7.75v-20h7.75a25.5,25.5 0 1 0 0,-51h-7.75zm36.2510,0h32a27.75,27.75 0 0 1 21.331,45.5a27.75,27.75 0 0 1 -21.331,45.5h-32a53.6895,53.6895 0 0 0 18.7464,-20h13.2526a7.75,7.75 0 1 0 0,-15.5h-7.75a53.6895,53.6895 0 0 0 0,-20h7.75a7.75,7.75 0 1 0 0,-15.5h-13.2526a53.6895,53.6895 0 0 0 -18.7464,-20z"></path>
                </clipPath>
                <linearGradient id="gradient-1" gradientUnits="userSpaceOnUse" x1="7" y1="64" x2="50" y2="107">
                <stop offset="0" stop-color="#f9a03c"></stop>
                <stop offset="1" stop-color="#f7974e"></stop>
                </linearGradient>
                <linearGradient id="gradient-2" gradientUnits="userSpaceOnUse" x1="2" y1="-2" x2="87" y2="84">
                <stop offset="0" stop-color="#f26d58"></stop>
                <stop offset="1" stop-color="#f9a03c"></stop>
                </linearGradient>
                <linearGradient id="gradient-3" gradientUnits="userSpaceOnUse" x1="45" y1="-10" x2="108" y2="53">
                <stop offset="0" stop-color="#b84e51"></stop>
                <stop offset="1" stop-color="#f68e48"></stop>
                </linearGradient>
                <g clip-path="url(#clip)">
                <path d="M-100,-102m-27,0v300h300z" fill="url(#gradient-1)"></path>
                <path d="M-100,-102m27,0h300v300z" fill="url(#gradient-3)"></path>
                <path d="M-100,-102l300,300" fill="none" stroke="url(#gradient-2)" stroke-width="40"></path>
                </g>
            </svg><span>Tweets</span>`;
        header.appendChild(title);

        const menu = this.makeEmptyElement('twitter-header-menu');
        const clear = document.createElement('span');
        clear.innerText = 'clear';
        menu.appendChild(clear);
        header.appendChild(menu);

        clear.addEventListener('click', () => {
            this.clearTweets();
        });

        return header;
    }

    makeList() {
        return this.makeEmptyElement('twitter-list');
    }
}

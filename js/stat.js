'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 20;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var CHART_HEIGHT = 150;
var playersNameY = CLOUD_Y + CLOUD_HEIGHT - GAP / 2 - TEXT_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  return Math.max.apply(null, array);
};

var getRandomBlue = function () {
  return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
};

var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, player, barX, barY, barHeight) {
  ctx.fillStyle = (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomBlue();

  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

};

var renderChart = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  players.forEach(function (player, i) {
    var barX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = (CHART_HEIGHT * times[i]) / maxTime;
    var barY = CLOUD_Y + TEXT_HEIGHT * 3 + GAP + (CHART_HEIGHT - barHeight);
    var scoreY = CLOUD_Y + TEXT_HEIGHT * 2 + GAP + (CHART_HEIGHT - barHeight);

    renderText(ctx, player, barX, playersNameY);
    renderText(ctx, Math.round(times[i]), barX, scoreY);

    renderBar(ctx, player, barX, barY, barHeight);
  });
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);

  renderChart(ctx, players, times);
};

'use strict';
{

	window.addEventListener('load', init);

	function init() {
		const stage = new createjs.Stage('canvas');

		const textWidth = 300;
		const textHeight = 150;

		const t = new createjs.Text("TAKANOBU", "bold 50px serif", "DarkRed");
		t.y = canvas.height / 2;
		t.textAlign = "left";
		t.textBaseline = 'middle';
		t.width = textWidth;
		t.height = textHeight;
		console.log(t.color);

		stage.addChild(t);

		const pitfallWidth = textWidth;
		const pitfallHeight = textHeight;

		const pitfall = new createjs.Shape();
		pitfall.graphics.beginFill("black");
		pitfall.graphics.drawEllipse(0, 0, pitfallWidth, pitfallHeight);

		pitfall.x = canvas.width - pitfallWidth;
		pitfall.y = canvas.height - pitfallHeight;

		stage.addChild(pitfall);

		const ball = new createjs.Shape();
		const ballRadius = 50;

		ball.graphics.beginFill('gray')
			.drawCircle(0, 0, ballRadius)
			.endFill();

		ball.x = canvas.width - ballRadius;
		ball.y = canvas.height / 2;
		ball.alpha = 0;
		stage.addChild(ball);

		createjs.Tween.get(t)
			.to({ x: canvas.width / 2 - pitfallWidth / 2 }, 2000)
			.to({ y: canvas.height - pitfallHeight / 2, alpha: 0 }, 1000, createjs.Ease.bounceInOut)
			.wait(7000)
			.to({ x: canvas.width / 2 - pitfallWidth / 2, y: textHeight / 2, alpha: 1 }, 100)
			.to({ x: canvas.width / 2 + pitfallWidth / 2, y: canvas.height / 2 }, 1000, createjs.Ease.sineIn)
			.to({ x: canvas.width / 2 - textWidth / 2 }, 4000)
			.wait(200)
			.call(hit)
			.to({ x: 0 }, 100)
			.to({ alpha: 0 }, 500)

		createjs.Tween.get(pitfall)
			.to({ x: canvas.width / 2 - 150 }, 2000)
			.wait(2000)
			.to({ alpha: 0 }, 2000)
			.wait(1000)
			.to({ alpha: 1 }, 2000)
			.wait(2000)
			.to({ x: 0, alpha: 0 }, 2000)

		createjs.Tween.get(ball)
			.wait(15100)
			.to({ alpha: 1 }, 100)
			.to({ x: canvas.width / 2 + textWidth / 2 + ballRadius }, 100)
			.to({ alpha: 0 }, 100)


		function hit() {
			t.color = "blue";
		}

		createjs.Ticker.timingMode = createjs.Ticker.RAF;

		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick() {
			stage.update();
		}


	}
}

let canvas=document.getElementById("cover");
		let ctx=canvas.getContext("2d");
		let dx=2;
		let dy=-2;
		let speed=9;
		let ballRadius=10;
		let x=canvas.width-350;
		let y=canvas.height-50;
		let paddleHeight=10;
		let paddleWidth=80;
		let paddleX1=200;
		let paddleX2=200;
		let score1=0;
		let score2=0;
		window.localStorage.setItem("score1",'0');
		window.localStorage.setItem("score2",'0');
		//score implementation is left
		function drawBall(){
			ctx.beginPath();
			ctx.arc(x,y,ballRadius,0,Math.PI*2);
			ctx.fillStyle="#b251b8";
			ctx.fill();
			ctx.closePath();
		}
		function moveBall(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			drawBall();
			drawPaddle1();
			drawPaddle2();

			document.getElementById("score1").innerHTML=window.localStorage.getItem("score1");
			document.getElementById("score2").innerHTML=window.localStorage.getItem("score2");

			{if(y+dy<ballRadius)
			{
				if(x>paddleX2 && x<paddleX2+paddleWidth)
					{dy=-dy;}
				else{
					alert("Player 2 loses the game :(");
					score1++;
					window.localStorage.setItem("score1", String(score1));
					// clearInterval(interval);
					x=canvas.width-350;
					y=canvas.height-50;
					dx=2;
					dy=-2;
					moveBall();
				}
			}
			else if(y+dy>canvas.width)
			{
				if(x>paddleX1 && x<paddleX1+paddleWidth)
					{dy=-dy;}
				else{
					alert("Player 1 loses the game :(");
					score2++;
					window.localStorage.setItem("score2", String(score2));
					// document.location.reload();
					// clearInterval(interval);
					x=canvas.width-350;
					y=canvas.height-50;
					dx=2;
					dy=-2;

					moveBall();
				}
			}
			}
			{if(x+dx>canvas.width-ballRadius || x+dx<ballRadius)
				{dx=-dx;}
			x+=dx;
			y+=dy;
			}
			{if(rightPressed)
				{	
					paddleX1+=7;
					if(paddleX1+paddleWidth>canvas.width)
						{paddleX1=canvas.width-paddleWidth;}
					
				}

			if(dPressed)
				{	
					paddleX2+=7;
					if(paddleX2+paddleWidth>canvas.width)
						{paddleX2=canvas.width-paddleWidth;}
					
				}


			if(leftPressed)
				{	
					
					if(paddleX1>=7)
						{paddleX1-=7;}
				}

			if(aPressed)
				{	
					if(paddleX2>=7)
						{paddleX2-=7;}
				}
			}
			drawObs();
			{
				if(!(y+dy<canvas.height/2 || y+dy>(canvas.height/2)+(paddleHeight*2)))
				{
					if(!((x+dx>obsWidth && x+dx<canvas.width*3/8) || (x+dx>((canvas.width*3/8)+obsWidth) && x+dx<(canvas.width*3/4))))
					{
						dy=-dy;
					}
				}
				if(x+dx==obsWidth || x+dx==canvas.width*3/8 || x+dx==((canvas.width*3/8)+obsWidth) || x+dx==canvas.width*3/4)
				{
					dx=-dx;
				}
			}
		}
		//implementation of spped increment is left
		let interval=setInterval(moveBall,speed);
		function drawPaddle1(){
			ctx.beginPath();
			ctx.rect(paddleX1,canvas.height-paddleHeight,paddleWidth,paddleHeight);	
			ctx.fillStyle="#b251b8";
			ctx.fill();
			ctx.closePath();
		}
		function drawPaddle2(){
			ctx.beginPath();
			ctx.rect(paddleX2,0,paddleWidth,paddleHeight);
			ctx.fillStyle="#b251b8";
			ctx.fill();
			ctx.closePath();
		}
		let rightPressed=false;
		let leftPressed=false;
		let aPressed=false;
		let dPressed=false;
		document.addEventListener("keydown",keyDownHandler,false);
		document.addEventListener("keyup",keyUpHandler,false);
		function keyDownHandler(e){
		if(e.keyCode==37)
			{leftPressed=true;}
		else if(e.keyCode==39)
			{rightPressed=true;}
		else if(e.keyCode==65)
			{aPressed=true;}
		else if(e.keyCode==68)
			{dPressed=true;}
		}
		function keyUpHandler(e){
			if(e.keyCode==37)
			{leftPressed=false;}
		else if(e.keyCode==39)
			{rightPressed=false;}
		else if(e.keyCode==65)
			{aPressed=false;}
		else if(e.keyCode==68)
			{dPressed=false;}
		}
		let obsWidth=canvas.width/4;
		let obsHeight=paddleHeight*2;
		function drawObs(){
			ctx.beginPath();
			ctx.rect(0,canvas.height/2,obsWidth,obsHeight);
			ctx.rect(canvas.width*3/8,canvas.height/2,obsWidth,obsHeight);
			ctx.rect(canvas.width*3/4,canvas.height/2,obsWidth,obsHeight);
			ctx.fillStyle="#b251b8";
			ctx.fill();
			ctx.closePath();
		}
		moveBall();

export default function HeroMobile(){
    return (
        <div className="w-full h-screen"
        style={{backgroundImage: "url(" + "/hero/full.png" + ")",
        backgroundSize: "cover",
        backgroundPosition: "55% 50%"
        }}
        >
            {/* <img src="/hero/full.png" className="h-full bg-top"/> */}
        </div>
    )
}
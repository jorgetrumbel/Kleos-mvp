import svgPaths from "./svg-e8rmduv2xl";
import imgLogin from "./6756315561075879ccf2bce0b6a9eb51f8b06c22.png";
import imgImageRemovebgPreview1 from "./04d9e88d6c46fe3df8b3455953366bd47a216bc4.png";

function IOsHomeIndicatorMargin() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col h-[14px] items-start justify-end left-[115px] min-h-[6px] pb-[8px] w-[128px]" data-name="iOS Home Indicator:margin">
      <div className="bg-[rgba(255,255,255,0.4)] h-[6px] relative rounded-[9999px] shrink-0 w-[128px]" data-name="iOS Home Indicator" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Nimbus_Sans:Bold_Italic',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[3px] uppercase w-[192.48px]">
        <p className="leading-[36px]">ATHLETICA</p>
      </div>
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="HeaderLogo">
      <Heading />
    </div>
  );
}

function HeaderLogoMargin() {
  return (
    <div className="content-stretch flex flex-col h-[119px] items-start pb-[48px] relative shrink-0" data-name="HeaderLogo:margin">
      <div className="h-[83px] relative shrink-0 w-[192px]" data-name="image-removebg-preview 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[220.03%] left-[-0.25%] max-w-none top-[-58.21%] w-full" src={imgImageRemovebgPreview1} />
        </div>
      </div>
      <HeaderLogo />
    </div>
  );
}

function HeaderSectionMargin() {
  return (
    <div className="absolute content-stretch flex flex-col h-[119px] items-start left-[84px] pb-[32px] top-[48px]" data-name="HeaderSection:margin">
      <HeaderLogoMargin />
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="relative shrink-0" data-name="Heading 2:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[24px] text-white w-[157.47px]">
          <p className="leading-[32px]">Bienvenido/a</p>
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] pr-[51.03px] relative size-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] relative shrink-0 text-[#9ca3af] text-[14px] w-[192.97px]">
          <p className="leading-[20px] mb-0">¿Estás listo para seguir con tu</p>
          <p className="leading-[20px]">propósito?</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[240px]" data-name="Label">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-white w-[36.23px]">
        <p className="leading-[20px]">Email</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">carlos@coach.com</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(30,41,59,0.5)] relative rounded-[16px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[48px] pr-[16px] py-[16px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pe78580} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[16px] top-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container2 />
    </div>
  );
}

function EmailField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="Email Field">
      <Label />
      <Container />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[240px]" data-name="Label">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-white w-[78.97px]">
        <p className="leading-[20px]">Contraseña</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[24px]">password123</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[rgba(30,41,59,0.5)] relative rounded-[16px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[48px] py-[16px] relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p22a3d300} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[16px] top-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pfaa02c0} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p209a5800} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center right-[16px] top-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function PasswordField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="Password Field">
      <Label1 />
      <Container3 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pf079980} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="image fill">
      <Svg3 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#65a30d] content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
      <ImageFill />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-white w-[71.53px]">
        <p className="leading-[16px]">Recordarme</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label">
      <Input2 />
      <Margin1 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#38bdf8] text-[12px] w-[127.56px]">
        <p className="leading-[16px]">Olvidé mi contraseña?</p>
      </div>
    </div>
  );
}

function OptionsRememberMeForgotPassword() {
  return (
    <div className="relative shrink-0 w-full" data-name="Options: Remember Me & Forgot Password">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[4px] relative size-full">
          <Label2 />
          <Link />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[18px] text-black text-center w-[112.56px]">
        <p className="leading-[28px]">Iniciar sesión</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p20773700} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24px]" data-name="SVG">
      <Svg5 />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pl-[8px] relative shrink-0 w-[32px]" data-name="SVG:margin">
      <Svg4 />
    </div>
  );
}

function SubmitButton() {
  return (
    <div className="bg-gradient-to-r content-stretch drop-shadow-[0px_0px_12.5px_rgba(163,230,53,0.4)] flex from-[#4ade80] items-center justify-center py-[16px] relative rounded-[9999px] shrink-0 to-[#a3e635] w-full" data-name="Submit Button">
      <Container7 />
      <SvgMargin />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.3px] uppercase w-[118.33px]">
        <p className="leading-[16px]">o continuar con</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-full" data-name="Divider">
      <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#374151] border-solid border-t inset-0 pointer-events-none" />
      </div>
      <Margin2 />
      <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#374151] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_149)" id="SVG">
          <path d={svgPaths.pd43ee00} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_149">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white w-[137.95px]">
        <p className="leading-[20px]">Continuar con Apple</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(30,41,59,0.5)] content-stretch flex items-center justify-center px-px py-[13px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(55,65,81,0.5)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Svg6 />
      <Margin3 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p938c580} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.pf327680} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.p281c5f00} fill="var(--fill-0, #FBBC05)" id="Vector_3" />
          <path d={svgPaths.p2812ea00} fill="var(--fill-0, #EA4335)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white w-[148.34px]">
        <p className="leading-[20px]">Continuar con Google</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(30,41,59,0.5)] content-stretch flex items-center justify-center px-px py-[13px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(55,65,81,0.5)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Svg7 />
      <Margin4 />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Social Buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute border-[#a3e635] border-b-2 border-solid font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[40px] left-[8px] text-[#a3e635] top-[17px] w-[222px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[calc(50%-42.22px)] top-[29px] w-[47.56px]">
        <p className="leading-[20px]">cuenta</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[20px] justify-center left-[calc(50%-85.23px)] top-[29px] w-[37.97px]">
        <p className="leading-[20px]">Crear</p>
      </div>
    </div>
  );
}

function FooterLink() {
  return (
    <div className="h-[56px] leading-[0] relative shrink-0 text-[14px] text-center w-full" data-name="Footer link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[20px] justify-center left-[calc(50%-20.99px)] text-[#9ca3af] top-[26px] w-[174.61px]">
        <p>
          <span className="leading-[20px]">¿Todavía no tenés cuenta?</span>
          <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] text-white">{` `}</span>
        </p>
      </div>
      <Link1 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Form">
      <EmailField />
      <PasswordField />
      <OptionsRememberMeForgotPassword />
      <SubmitButton />
      <Divider />
      <SocialButtons />
      <FooterLink />
    </div>
  );
}

function FormMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative size-full">
        <Form />
      </div>
    </div>
  );
}

function SectionLoginCard() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(15,23,42,0.6)] content-stretch flex flex-col items-center left-[24px] p-[33px] right-[24px] rounded-[40px] top-[216px]" data-name="Section - LoginCard">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[40px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.8)]" />
      <Heading2Margin />
      <Margin />
      <FormMargin />
    </div>
  );
}

function MainContainer() {
  return (
    <div className="drop-shadow-[0px_25px_25px_rgba(0,0,0,0.25)] flex-[1_0_0] h-[1036px] max-w-[448px] min-h-[812px] min-w-px overflow-clip relative rounded-[48px]" data-name="MainContainer">
      <IOsHomeIndicatorMargin />
      <div className="absolute blur-[30px] inset-[70%_-10%_-10%_-10%]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 429.59 414.39\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(30.377 0 0 58.604 214.79 414.39)\\'><stop stop-color=\\'rgba(52,211,153,0.25)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(5,150,105,0.1)\\' offset=\\'0.4\\'/><stop stop-color=\\'rgba(5,150,105,0)\\' offset=\\'0.8\\'/></radialGradient></defs></svg>')" }} data-name="Gradient+Blur" />
      <HeaderSectionMargin />
      <SectionLoginCard />
    </div>
  );
}

export default function Login() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full" data-name="Login">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogin} />
      <MainContainer />
    </div>
  );
}
function generateWordClouds()
%GENERATEWORDCLOUDS Generate static MATLAB word cloud assets for the app.
% Word size reflects repeated emphasis across job descriptions, diagnostics,
% curriculum tasks, tools, outputs, and resource tags.

projectRoot = fileparts(mfilename("fullpath"));
outputDir = fullfile(projectRoot, "public", "assets");
if ~isfolder(outputDir)
    mkdir(outputDir);
end

clouds = getCloudData();

for idx = 1:numel(clouds)
    style = getCloudStyle(clouds(idx).id);
    fig = figure( ...
        Visible="off", ...
        Color=style.BackgroundColor, ...
        InvertHardcopy="off", ...
        Position=[100 100 1440 840]);

    words = string(clouds(idx).words(:));
    weights = double(clouds(idx).weights(:));
    cloudTable = table(words, weights, 'VariableNames', {'Word','Weight'});

    annotation(fig, "textbox", [0.045 0.91 0.58 0.055], ...
        String=clouds(idx).title, ...
        EdgeColor="none", ...
        FontName="Malgun Gothic", ...
        FontWeight="bold", ...
        FontSize=25, ...
        Color=style.TitleColor, ...
        Interpreter="none");
    annotation(fig, "textbox", [0.047 0.865 0.62 0.045], ...
        String="채용공고 키워드 · 진단 문항 · 로드맵 과제 반복 빈도", ...
        EdgeColor="none", ...
        FontName="Malgun Gothic", ...
        FontSize=12, ...
        Color=style.MutedColor, ...
        Interpreter="none");
    annotation(fig, "textbox", [0.73 0.895 0.22 0.05], ...
        String="MATLAB wordcloud", ...
        HorizontalAlignment="right", ...
        VerticalAlignment="middle", ...
        EdgeColor=style.BadgeBorderColor, ...
        BackgroundColor=style.BadgeColor, ...
        FontName="Malgun Gothic", ...
        FontWeight="bold", ...
        FontSize=12, ...
        Color=style.TitleColor, ...
        Interpreter="none");

    wc = wordcloud(cloudTable, "Word", "Weight");
    wc.Position = [0.035 0.06 0.93 0.79];
    wc.MaxDisplayWords = 42;
    wc.Title = "";
    wc.Shape = "rectangle";
    wc.SizePower = 0.68;
    wc.Color = getWordColors(numel(words), style);
    wc.HighlightColor = style.HighlightColor;
    wc.Box = "off";

    try
        wc.FontName = "Malgun Gothic";
    catch
        % Some MATLAB releases do not expose FontName on WordCloudChart.
    end

    outputFile = fullfile(outputDir, "wordcloud-" + clouds(idx).id + ".png");
    drawnow;
    exportgraphics(fig, outputFile, Resolution=230);
    close(fig);
    fprintf("Generated %s\n", outputFile);
end
end

function clouds = getCloudData()
clouds = [
    makeCloud("mechanical-cae", "기계 설계·CAE 핵심 역량", ...
        ["CAD","FEA","재료역학","하중","경계조건","안전율","공차","제조성","도면","3D모델링","응력","변형률","메시","열해석","시험조건","설계변경","요구사항","치수","검증","리포트","기구설계","CAE해석","DFM","시제품","MATLAB","Python","Excel","양산성","브래킷","손계산"], ...
        [14,13,12,11,11,10,9,9,9,8,8,8,8,8,7,7,7,7,7,7,7,7,6,6,5,5,5,5,4,4]), ...
    makeCloud("production-quality", "생산·공정·품질 핵심 역량", ...
        ["SPC","공정데이터","Cpk","FMEA","관리도","불량원인","8D","Pareto","통계","공정능력","CTQ","품질관리","공정기술","QAQC","개선안","측정","이상치","DOE","표준편차","불량률","MES","Excel","Python","재발방지","검사위치","원인분석","공정변수","표준작업","데이터분석","품질보증"], ...
        [14,13,12,12,11,11,10,10,9,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,5,5,5,4,4,4]), ...
    makeCloud("semiconductor-equipment", "반도체 공정·장비 핵심 역량", ...
        ["공정흐름","장비조건","수율","계측","플라즈마","진공","식각","증착","노광","CMP","결함","CD","압력","온도","가스유량","RFpower","Pareto","반도체소자","조건변경","리스크","불량분석","장비로그","공정개선","Troubleshooting","수율분석","클린룸","SPC","Python","Defect","균일도"], ...
        [14,13,12,11,11,10,10,9,9,9,9,8,8,8,8,8,8,7,7,7,6,6,6,6,6,5,5,5,5,4]), ...
    makeCloud("electronics-pcb", "전자회로·PCB·하드웨어 핵심 역량", ...
        ["PCB","전원회로","회로이론","계측","검증","리턴패스","디커플링","부품선정","ADC","리플","발열","오실로스코프","전원무결성","그라운드","SPICE","센서신호","이득","노이즈","데이터시트","측정포인트","회로블록도","멀티미터","EMC","PassFail","하드웨어설계","PCBLayout","검증리포트","Buck","LDO","프로브"], ...
        [14,13,12,11,11,10,10,9,9,9,8,8,8,8,7,7,7,7,7,6,6,6,6,6,5,5,5,5,4,4]), ...
    makeCloud("embedded-control", "임베디드·제어 핵심 역량", ...
        ["MCU","C언어","UART","PID","디버깅","인터럽트","Timer","ADC","PWM","센서","통신프로토콜","로그","체크섬","SPI","I2C","CAN","제어공학","오버슈트","정착시간","펌웨어","GPIO","README","LogicAnalyzer","Git","ROS","센서통합","제어알고리즘","타이밍","재현절차","주변장치"], ...
        [14,13,12,12,11,10,10,9,9,9,8,8,8,7,7,7,7,6,6,6,6,5,5,5,5,5,5,4,4,4])
];
end

function cloud = makeCloud(id, titleText, words, weights)
cloud = struct();
cloud.id = char(id);
cloud.title = char(titleText);
cloud.words = cellstr(words);
cloud.weights = weights;
end

function style = getCloudStyle(id)
style = struct();
style.BackgroundColor = [0.984 0.992 0.976];
style.TitleColor = [0.090 0.129 0.169];
style.MutedColor = [0.376 0.439 0.502];
style.BadgeColor = [0.918 0.965 0.973];
style.BadgeBorderColor = [0.737 0.878 0.906];
style.HighlightColor = [0.650 0.294 0.165];

switch string(id)
    case "mechanical-cae"
        style.Colors = [
            0.082 0.369 0.459
            0.650 0.294 0.165
            0.173 0.435 0.306
            0.212 0.263 0.310
            0.584 0.451 0.173
            0.298 0.365 0.439
        ];
    case "production-quality"
        style.Colors = [
            0.082 0.369 0.459
            0.650 0.294 0.165
            0.173 0.435 0.306
            0.114 0.149 0.196
            0.584 0.451 0.173
            0.361 0.439 0.502
        ];
    case "semiconductor-equipment"
        style.Colors = [
            0.082 0.369 0.459
            0.388 0.275 0.600
            0.650 0.294 0.165
            0.173 0.435 0.306
            0.114 0.149 0.196
            0.498 0.357 0.165
        ];
    case "electronics-pcb"
        style.Colors = [
            0.114 0.149 0.196
            0.082 0.369 0.459
            0.650 0.294 0.165
            0.584 0.451 0.173
            0.173 0.435 0.306
            0.361 0.439 0.502
        ];
    case "embedded-control"
        style.Colors = [
            0.082 0.369 0.459
            0.173 0.435 0.306
            0.650 0.294 0.165
            0.114 0.149 0.196
            0.216 0.388 0.604
            0.584 0.451 0.173
        ];
    otherwise
        style.Colors = [
            0.082 0.369 0.459
            0.650 0.294 0.165
            0.173 0.435 0.306
            0.114 0.149 0.196
        ];
end
end

function colors = getWordColors(numWords, style)
palette = style.Colors;
colors = palette(mod(0:numWords-1, size(palette, 1)) + 1, :);

if numWords >= 1
    colors(1, :) = style.HighlightColor;
end
if numWords >= 2
    colors(2, :) = palette(1, :);
end
if numWords >= 3
    colors(3, :) = palette(3, :);
end
end

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
    fig = figure( ...
        Visible="off", ...
        Color="white", ...
        Position=[100 100 960 560]);

    words = string(clouds(idx).words(:));
    weights = double(clouds(idx).weights(:));
    cloudTable = table(words, weights, 'VariableNames', {'Word','Weight'});
    wc = wordcloud(cloudTable, "Word", "Weight");
    wc.MaxDisplayWords = 36;
    wc.Title = "";

    try
        wc.FontName = "Malgun Gothic";
    catch
        % Some MATLAB releases do not expose FontName on WordCloudChart.
    end

    outputFile = fullfile(outputDir, "wordcloud-" + clouds(idx).id + ".png");
    exportgraphics(fig, outputFile, Resolution=170);
    close(fig);
    fprintf("Generated %s\n", outputFile);
end
end

function clouds = getCloudData()
clouds = [
    makeCloud("mechanical-cae", "기계 설계·CAE 핵심 역량", ...
        ["CAD","FEA","재료역학","하중","경계조건","안전율","공차","제조성","도면","3D모델링","응력","변형률","메시","열해석","시험조건","설계변경","요구사항","치수","검증","리포트","MATLAB","Python","Excel","시제품"], ...
        [13,12,11,10,10,9,8,8,8,8,8,7,7,7,7,7,7,6,6,6,5,5,4,4]), ...
    makeCloud("production-quality", "생산·공정·품질 핵심 역량", ...
        ["SPC","공정데이터","Cpk","FMEA","관리도","불량원인","8D","Pareto","통계","공정능력","CTQ","품질관리","개선안","측정","이상치","DOE","표준편차","불량률","MES","Excel","Python","재발방지","검사위치","원인분석"], ...
        [13,12,11,11,10,10,9,9,9,9,8,8,8,7,7,7,6,6,5,5,5,5,4,4]), ...
    makeCloud("semiconductor-equipment", "반도체 공정·장비 핵심 역량", ...
        ["공정흐름","장비조건","수율","계측","플라즈마","진공","식각","증착","노광","CMP","결함","CD","압력","온도","가스유량","RFpower","Pareto","반도체소자","조건변경","리스크","불량분석","SPC","Python","장비로그"], ...
        [13,12,11,10,10,9,9,9,8,8,8,8,7,7,7,7,7,7,6,6,6,5,5,5]), ...
    makeCloud("electronics-pcb", "전자회로·PCB·하드웨어 핵심 역량", ...
        ["PCB","전원회로","회로이론","계측","검증","리턴패스","디커플링","부품선정","ADC","리플","발열","오실로스코프","전원무결성","그라운드","SPICE","센서신호","이득","노이즈","데이터시트","측정포인트","회로블록도","멀티미터","EMC","PassFail"], ...
        [13,12,11,10,10,9,9,9,8,8,8,8,7,7,7,7,7,7,6,6,6,5,5,5]), ...
    makeCloud("embedded-control", "임베디드·제어 핵심 역량", ...
        ["MCU","C언어","UART","PID","디버깅","인터럽트","Timer","ADC","PWM","센서","통신프로토콜","로그","체크섬","SPI","I2C","CAN","제어공학","오버슈트","정착시간","펌웨어","GPIO","README","LogicAnalyzer","Git"], ...
        [13,12,11,11,10,10,9,9,9,8,8,8,7,7,7,7,7,6,6,6,6,5,5,5])
];
end

function cloud = makeCloud(id, titleText, words, weights)
cloud = struct();
cloud.id = char(id);
cloud.title = char(titleText);
cloud.words = cellstr(words);
cloud.weights = weights;
end

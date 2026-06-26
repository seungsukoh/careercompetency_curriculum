function generateWordClouds(targetPattern)
%GENERATEWORDCLOUDS Generate static MATLAB word cloud assets for the app.
% Word size reflects repeated emphasis across job descriptions, diagnostics,
% curriculum tasks, tools, outputs, and resource tags.
if nargin < 1
    targetPattern = "";
end

projectRoot = fileparts(mfilename("fullpath"));
outputDir = fullfile(projectRoot, "public", "assets");
if ~isfolder(outputDir)
    mkdir(outputDir);
end

clouds = [getCloudData(), getRoleCloudData(projectRoot)];
targetPattern = lower(string(targetPattern));
if strlength(targetPattern) > 0
    cloudText = lower(string({clouds.id}) + " " + string({clouds.fileName}) + " " + string({clouds.title}) + " " + string({clouds.styleId}));
    clouds = clouds(contains(cloudText, targetPattern));
end

for idx = 1:numel(clouds)
    style = getCloudStyle(clouds(idx).styleId);
    fig = figure( ...
        Visible="off", ...
        Color=style.BackgroundColor, ...
        Position=[100 100 1440 840]);

    words = string(clouds(idx).words(:));
    weights = sqrt(double(clouds(idx).weights(:))) * 10;
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
        String=clouds(idx).subtitle, ...
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
    wc.Position = [0.045 0.13 0.91 0.66];
    wc.MaxDisplayWords = clouds(idx).maxDisplayWords;
    wc.Title = "";
    wc.Shape = "rectangle";
    wc.SizePower = clouds(idx).sizePower;
    wc.Color = getWordColors(numel(words), style);
    wc.HighlightColor = style.HighlightColor;
    wc.Box = "off";

    try
        wc.FontName = "Malgun Gothic";
    catch
        % Some MATLAB releases do not expose FontName on WordCloudChart.
    end

    outputFile = fullfile(outputDir, clouds(idx).fileName);
    drawnow;
    exportgraphics(fig, outputFile, Resolution=230);
    close(fig);
    fprintf("Generated %s\n", outputFile);
end
end

function roleClouds = getRoleCloudData(projectRoot)
appCode = fileread(fullfile(projectRoot, "app.js"));
jobRolesCode = appCode;

rolePattern = [ ...
    'id:\s*"([^"]+)",\s*' ...
    'title:\s*"([^"]+)",\s*' ...
    'postingKeywords:\s*\[([^\]]*)\],\s*' ...
    'industries:\s*\[[^\]]*\],\s*' ...
    'focus:\s*"([^"]*)",\s*' ...
    'responsibilities:\s*\[([^\]]*)\],\s*' ...
    'requirements:\s*\[([^\]]*)\],\s*' ...
    'preferred:\s*\[([^\]]*)\]' ...
];

[roleTokens, roleStarts] = regexp(jobRolesCode, rolePattern, "tokens", "start");
[trackTokens, trackStarts] = regexp(jobRolesCode, '"([^"]+)":\s*\[\s*\{', "tokens", "start");

roleClouds = struct("id", {}, "title", {}, "words", {}, "weights", {}, ...
    "styleId", {}, "fileName", {}, "subtitle", {}, "maxDisplayWords", {}, "sizePower", {});

for idx = 1:numel(roleTokens)
    token = roleTokens{idx};
    role = struct();
    role.id = string(token{1});
    role.title = string(token{2});
    role.postingKeywords = parseJsStringArray(token{3});
    role.focus = string(token{4});
    role.responsibilities = parseJsStringArray(token{5});
    role.requirements = parseJsStringArray(token{6});
    role.preferred = parseJsStringArray(token{7});
    role.trackId = getRoleTrackId(roleStarts(idx), trackTokens, trackStarts);

    diagnosticSkills = getDiagnosticSkills(appCode, role.id);
    [words, weights] = buildRoleCloudWords(role, diagnosticSkills);

    cloud = makeCloud("role-" + role.id, role.title + " 역량 워드클라우드", words, weights);
    cloud.styleId = char(role.trackId);
    cloud.fileName = char("wordcloud-role-" + role.id + ".png");
    cloud.subtitle = char("세부 직무 채용공고 키워드 · 진단 문항 · 업무·자격요건 반복 빈도");
    cloud.maxDisplayWords = 32;
    cloud.sizePower = 0.56;
    roleClouds(end+1) = cloud; %#ok<AGROW>
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
    makeCloud("chemical-process", "화학공정·소재 핵심 역량", ...
        ["물질수지","열역학","반응공학","분리공정","공정안전","수율","순도","전환율","선택도","PFD","HAZOP","PSM","MSDS","공정변수","온도","압력","유량","조성","증류","추출","흡수","막분리","공정모사","Aspen","HYSYS","DOE","SPC","배터리공정","전극공정","GMP"], ...
        [14,13,12,12,11,11,10,10,10,9,9,9,8,8,8,8,8,8,7,7,7,7,7,6,6,6,6,5,5,5]), ...
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
cloud.styleId = char(id);
cloud.fileName = char("wordcloud-" + string(id) + ".png");
cloud.subtitle = char("채용공고 키워드 · 진단 문항 · 로드맵 과제 반복 빈도");
cloud.maxDisplayWords = 42;
cloud.sizePower = 0.68;
end

function trackId = getRoleTrackId(roleStart, trackTokens, trackStarts)
trackIndex = find(trackStarts <= roleStart, 1, "last");
if isempty(trackIndex)
    trackId = "production-quality";
else
    trackId = string(trackTokens{trackIndex}{1});
end
trackId = regexprep(trackId, "-role-options$", "");
end

function values = parseJsStringArray(arrayText)
matches = regexp(arrayText, '"([^"]*)"', "tokens");
if isempty(matches)
    values = strings(0, 1);
    return;
end
values = string(cellfun(@(item) item{1}, matches, "UniformOutput", false));
values = values(:);
end

function diagnosticSkills = getDiagnosticSkills(appCode, roleId)
lines = splitlines(string(appCode));
roleLine = lines(contains(lines, """" + roleId + """: [["));
if isempty(roleLine)
    diagnosticSkills = strings(0, 1);
    return;
end

matches = regexp(char(roleLine(1)), '"([^"]*)"', "tokens");
values = string(cellfun(@(item) item{1}, matches, "UniformOutput", false));
if numel(values) < 2
    diagnosticSkills = strings(0, 1);
    return;
end
diagnosticSkills = values(2:2:end);
diagnosticSkills = diagnosticSkills(:);
end

function [words, weights] = buildRoleCloudWords(role, diagnosticSkills)
rawWords = strings(0, 1);
rawWeights = zeros(0, 1);

[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, role.postingKeywords, 13);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, diagnosticSkills, 10);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, extractCandidateWords(role.title), 4);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, extractCandidateWords(role.focus), 3);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, extractCandidateWords(role.responsibilities), 4);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, extractCandidateWords(role.requirements), 5);
[rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, extractCandidateWords(role.preferred), 4);

[words, weights] = aggregateCloudWords(rawWords, rawWeights);
[weights, order] = sort(weights, "descend");
words = words(order);
maxWords = min(44, numel(words));
words = words(1:maxWords);
weights = weights(1:maxWords);
end

function [rawWords, rawWeights] = addWeightedWords(rawWords, rawWeights, wordsToAdd, weight)
wordsToAdd = string(wordsToAdd(:));
wordsToAdd = wordsToAdd(strlength(strip(wordsToAdd)) > 0);
rawWords = [rawWords; wordsToAdd];
rawWeights = [rawWeights; repmat(weight, numel(wordsToAdd), 1)];
end

function words = extractCandidateWords(values)
text = join(string(values(:)), " ");
text = regexprep(text, '[\.,;:()\[\]""'']', " ");
text = replace(text, ["·", "/", "-"], " ");
parts = split(text);
parts = strip(regexprep(parts, "(을|를|이|가|은|는|와|과|의|에|에서|으로|로|도|만)$", ""));
parts = regexprep(parts, "[^0-9A-Za-z가-힣+#]", "");
parts = strip(parts);

stopWords = ["직무","엔지니어","담당","기초","이해","활용","작성","정리","검토", ...
    "관리","기반","경험","역량","조건","결과","문서화","리포트","계획","요구사항", ...
    "가능성","비교","정의","설명","기준","역할","사용","수립","수행","지원", ...
    "문제","이슈","기본","신규","또는","같은","등","수","할","있는"];

keep = strlength(parts) >= 2 ...
    & ~ismember(parts, stopWords) ...
    & ~contains(parts, "합니다");
words = unique(parts(keep), "stable");
words = words(:);
end

function [words, weights] = aggregateCloudWords(rawWords, rawWeights)
words = strings(0, 1);
weights = zeros(0, 1);
keys = strings(0, 1);

for idx = 1:numel(rawWords)
    word = cleanCloudWord(rawWords(idx));
    if strlength(word) < 2
        continue;
    end

    key = lower(regexprep(word, "[\s\-/·]+", ""));
    found = find(keys == key, 1);
    if isempty(found)
        keys(end+1, 1) = key; %#ok<AGROW>
        words(end+1, 1) = word; %#ok<AGROW>
        weights(end+1, 1) = rawWeights(idx); %#ok<AGROW>
    else
        weights(found) = weights(found) + rawWeights(idx);
    end
end
end

function word = cleanCloudWord(word)
word = string(word);
word = regexprep(word, "\s+", " ");
word = strip(word);
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
    case "chemical-process"
        style.Colors = [
            0.173 0.435 0.306
            0.082 0.369 0.459
            0.650 0.294 0.165
            0.365 0.333 0.180
            0.114 0.149 0.196
            0.455 0.314 0.533
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

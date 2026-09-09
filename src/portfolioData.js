import { withAssetBase } from './assetPath.js';

export const profile = {
  name: '谢名剑',
  role: 'Design Engineer',
  year: '©2026',
  headline: '设计数字产品、网站和 AI 体验。\n正在整理新的线上作品集',
  about:
    '这里先放一段关于你的中文介绍。后续可以替换成你的经历、设计方法、关注领域，以及你希望访客记住的个人气质。',
  aboutDetail:
    '目前这个页面先复刻参考站的排版节奏：大面积留白、直接的文字、克制的导航。等你准备好后，我们可以把这里扩展成更完整的个人叙事。',
  email: 'hello@example.com',
  socialLinks: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' }
  ]
};

export const navItems = [
  { label: 'APP', path: '/app' },
  { label: '网页', path: '/web' },
  { label: 'AI', path: '/ai' },
  { label: '摄影', path: '/photography' },
  { label: '关于', path: '/about' },
  { label: '联系', path: '/contact' }
];

export const caseFactTokens = [
  { key: 'brand', label: '品牌' },
  { key: 'status', label: '状态' },
  { key: 'role', label: '角色' },
  { key: 'scope', label: '范围' }
];

const rawPortfolioSections = {
  app: {
    title: '移动产品与体验',
    kicker: 'APP',
    projects: [
      {
        id: 'app-funnfuzzy-icon-guide',
        title: 'FunnFuzzy APP icon design guide',
        year: '2025',
        type: '图标系统',
        summary: '为 FunnFuzzy APP 梳理图标视觉规范：统一线性风格、品牌识别和移动端场景中的使用方式。',
        color: '#FFAC33',
        coverVariant: 'app-icon-guide',
        caseStudy: {
          eyebrow: 'APP / Icon System',
          role: '视觉系统 / APP 图标规范',
          users: 'APP 用户、产品、设计与开发',
          scene: '移动端导航、订单、会员与服务场景',
          output: '图标库 + 设计规范 + 使用示例',
          intro:
            '为 FunnFuzzy APP 建立一套清晰、可复用的图标设计 guide，让品牌识别、功能表达和移动端界面保持一致。',
          sections: [
            {
              label: '01 / 品牌符号演变',
              title: '品牌符号演变',
              body:
                '提取品牌 Logo 的直角、半圆与几何块面，统一图标的圆角、转折和视觉重心，兼顾品牌识别与功能清晰度。'
            },
            {
              label: '02 / 几何结构',
              title: '几何结构',
              body:
                '以统一的方形网格与圆形基准控制图标的外轮廓、转角与视觉重心，确保不同形态在尺寸、留白和识别效率上保持一致。'
            },
            {
              label: '03 / 线条',
              title: '线条',
              body:
                '图标以 48×48 网格为统一绘制基准，主线固定为 3px，并采用全直角端点与明确转折。通过控制线段长度、间距和视觉重心，使不同复杂度、方向与功能语义的图标在界面中保持一致的视觉重量、清晰边界和识别效率。'
            },
            {
              label: '04 / 修饰符',
              title: '修饰符',
              body:
                '组合图标以 48×48dp 网格为基准，修饰符外扩 3dp 建立独立安全区。主图形主动避让该区域，避免轮廓重叠与视觉粘连；相交处以全直角断点收口，确保小尺寸下结构清晰、层级稳定。'
            },
            {
              label: '05 / 设计展示',
              title: '设计展示',
              body:
                '集中展示核心业务与通用操作图标，在统一网格中校验线宽、尺寸、留白和视觉重心，确保不同语义与复杂度的图标仍保持清晰、协调的系统表现。'
            },
            {
              label: '06 / 场景应用',
              title: '场景应用',
              body:
                '将图标规范落入导航、订单、会员、筛选与宠物档案等高频界面，在不同信息密度与内容层级中保持清晰识别、统一视觉重量和稳定的操作反馈。'
            },
            {
              label: '04 / 图标体系',
              title: '统一线宽、结构和视觉重心',
              body:
                '图标库覆盖搜索、订单、配送、会员、收藏、返回、筛选、排序、消息等核心场景。通过一致的线宽、端点、转角和留白规则，让不同功能图标在同一个界面里保持同等重量。'
            },
            {
              label: '05 / 使用方式',
              title: '让图标在实际 APP 场景里更稳定',
              body:
                '规范重点不是把图标摆满页面，而是定义它们在导航、状态、功能入口和运营模块里的使用方式。设计时保留充足安全区，避免图标在小尺寸下变形或失去识别。'
            },
            {
              label: '06 / 交付',
              title: '从单个图标沉淀为可维护的图标库',
              body:
                '最终产出包含品牌 logo、核心图标库、图标网格展示和 design guide 原稿。后续新增图标可以按同一套规则延展，降低 APP 迭代时的视觉维护成本。'
            }
          ]
        }
      },
      {
        id: 'app-ideal-vmall',
        title: '理想中的华为商城',
        year: '2024',
        type: 'APP改版',
        summary:
          '从消费趋势、用户研究与竞品洞察出发，重新组织商品详情与订单体验，探索更纯净、贴心且高品质的旗舰商城。',
        color: '#F3F3F0',
        coverImage: '/assets/ideal-vmall/cover.jpg',
        coverImageAlt: '理想中的华为商城项目封面',
        caseStudy: {
          template: 'ideal-vmall',
          intro:
            '从消费者行为变化出发，围绕更审慎的购买决策与更高的线上信任，探索华为商城在鸿蒙体验下的高端化升级。',
          facts: [
            { label: '品牌', value: '华为商城' },
            { label: '状态', value: '已上线' },
            { label: '角色', value: '设计与策略' },
            { label: '范围', value: '研究、框架、设计' },
          ],
        }
      },
      {
        id: 'app-vmall-language-system',
        title: '界面用语规范',
        year: '2024',
        type: '设计规范',
        summary:
          '从真实商城场景中梳理语言问题，建立覆盖基础原则、编辑格式与关键交互场景的界面用语规范。',
        color: '#EAF4FF',
        coverVariant: 'vmall-language-system',
        caseStudy: {
          eyebrow: 'APP / Language Design System',
          facts: [
            { label: '品牌', value: '华为商城' },
            { label: '状态', value: '已宣讲' },
            { label: '角色', value: '交互' },
            { label: '范围', value: '内容、规范' },
          ],
          role: '内容设计 / 规范系统',
          users: '商城用户、产品、设计与研发',
          scene: '空状态、删除、确认与异常反馈',
          output: '写作原则 + 编辑规范 + 场景指南',
          intro:
            '从真实商城场景中梳理问题，建立覆盖写作原则、编辑格式与关键交互场景的界面语言设计系统。',
          outcome:
            '规范把零散经验转化为团队共同使用的内容设计基础：统一跨业务表达，减少重复讨论，降低高风险操作的不确定性，并为后续审核与规则扩展建立依据。',
          architecture: [
            ['界面用语原则', '六个写作原则与七条内容设计指导'],
            ['编辑规范', '语气语调、时间日期、标点、空格与通用词语'],
            ['场景化写作指导', '空状态、删除、确认、异常、帮助、设置与全球化']
          ],
          sections: [
            {
              title: '六个写作原则',
              body:
                '先建立共同的写作判断，再讨论具体用词。六个写作原则定义了友好、简洁、清晰、以用户目标为中心的判断基础。',
              principles: [
                {
                  title: '友好而尊重',
                  summary: '像人与人交谈一样直接称呼用户，让表达自然、平等，不过度正式。',
                  keywords: ['直接称呼', '自然表达', '避免机械'],
                  details: [
                    '使用让用户感到舒适、被理解、被尊重的表达方式。避免过于正式、机械或傲慢的表达。',
                    '使用“您”“您的”直接称呼用户，像界面直接和用户交谈一样，让用户感受到内容与他相关，而不是在阅读枯燥的系统说明文。',
                    '注意不要完全按照说话的方式写作，以免过于口语化和冗长。'
                  ]
                },
                {
                  title: '只提供必要信息',
                  summary: '围绕用户当前目标组织内容，优先呈现真正影响判断和行动的信息。',
                  keywords: ['目标优先', '必要信息', '先说重点'],
                  details: [
                    '用户只关注自己的实际需要，并不想了解产品的全部细节。因此，要少谈产品的“卖点”，多谈用户的“买点”。',
                    '在正确的位置、正确的时机，提供支撑用户目标的必要信息——不多不少，抓住用户最关心、最疑惑的点，支撑用户自信做决策。',
                    '将重要的信息先说，次要的信息后说，不重要的信息不说。更多信息可根据用户需求，在其他信息触点逐步呈现。'
                  ]
                },
                {
                  title: '简洁但不缺信息',
                  summary: '删除上下文已经说明的内容，避免句子和段落重复，同时保留行动所需信息。',
                  keywords: ['减少重复', '清晰简洁', '字字有用'],
                  details: [
                    '冗长的文本会让用户失去耐心。通过上下文可知的内容，不必重复呈现给用户；相邻的句子、段落应避免信息重复。',
                    '保持界面文案清晰简洁，删减每一个多余的字，字字有用意、有的放矢。'
                  ]
                },
                {
                  title: '使用熟悉的词语',
                  summary: '选择用户能快速理解的常用表达，减少生僻词、内部概念和技术术语。',
                  keywords: ['常用表达', '用户语言', '减少术语'],
                  details: [
                    '根据对用户的了解，斟酌每个词语是否易于用户理解。尽量选用清晰易懂的常用词汇，避免生僻、过于技术化的词语。'
                  ]
                },
                {
                  title: '鼓励用户行动',
                  summary: '聚焦用户可以做什么，减少失败、错误和道歉式表达带来的挫败感。',
                  keywords: ['自信语气', '正向行动', '避免否定'],
                  details: [
                    '希望用户尝试新功能，但要明白新技术常常会让人感到陌生而不敢轻易尝试。使用自信的语气，告诉用户他可以做什么，让用户放心自己有能力掌握任何功能。',
                    '适当使用“只需”“简单”“轻松”“即可”等词语来鼓励用户。',
                    '少用“失败”“错误”等负向色彩浓厚的词语，避免使用双重否定、道歉的语气。'
                  ]
                },
                {
                  title: '保持表达统一',
                  summary: '让标题与正文相互呼应，同一场景保持用词、风格与视角一致。',
                  keywords: ['文题一致', '用词统一', '视角统一'],
                  details: [
                    '标题与其下的说明文字应相互呼应，避免“文不对题”。',
                    '同一界面、同一场景的内容，应做到用词统一、风格统一、视角统一。'
                  ]
                }
              ],
              guidanceTitle: '七条内容设计指导',
              guidanceBody:
                '在开始写作前，先明确用户、场景、价值、限制、商业目标、呈现方式与衡量标准，让内容同时服务用户目标与商业目标。',
              guidance: [
                {
                  title: '用户是谁？',
                  summary: '先明确目标用户，再决定语言深度、信息范围和表达方式。',
                  keywords: ['用户认知', '语言深度', '表达方式'],
                  details: ['明确定义目标用户，有助于在写作前做合理的内容规划。思考文案的目标读者——是普通大众，还是软件开发者？是游戏玩家，还是音乐发烧友？是全职开发人员，还是业余编程爱好者？根据目标用户不同，设计合理的内容和语言表达。']
                },
                {
                  title: '使用场景是什么？',
                  summary: '找到用户真正需要帮助的关键时刻，而不是孤立地解释功能。',
                  keywords: ['关键时刻', '真实任务', 'TOP 场景'],
                  details: ['用户不会仅仅为了学习一个功能而阅读文案，他们更关心在什么场景下需要用到此功能。站在用户角度，思考他们使用此功能的 TOP 场景。']
                },
                {
                  title: '核心价值是什么？',
                  summary: '明确功能解决了用户的哪一个主要问题，内容才有清晰焦点。',
                  keywords: ['用户痛点', '核心诉求', '解决方向'],
                  details: ['挖掘用户的 TOP 痛点／诉求，并思考功能是如何解决的。']
                },
                {
                  title: '功能有哪些限制？',
                  summary: '提前说明不足，并在必要时提供规避、补救或替代方法。',
                  keywords: ['明确限制', '规避方法', '提前建议'],
                  details: ['用户如何做可以规避或减少功能的缺点？文案是否应提前给予建议？']
                },
                {
                  title: '商业目标是什么？',
                  summary: '判断内容需要促进使用、建立认知，还是帮助用户谨慎决策。',
                  keywords: ['促进使用', '建立认知', '辅助决策'],
                  details: ['用户目标固然重要，但每一次通过文案和用户的“交谈”也有其商业目标。目标是提升功能使用率？还是提升特性美誉度？亦或是希望用户“谨慎选择”？根据商业目标不同，文案的内容设计也会有差异。']
                },
                {
                  title: '内容如何呈现？',
                  summary: '在界面文字、帮助文档和视频之间，选择最适合当前任务的载体。',
                  keywords: ['界面文本', '帮助文档', '指导视频'],
                  details: ['是使用简短的界面融合式文本？还是嵌入式帮助文档链接？亦或是指导视频？围绕用户目标和商业目标，思考信息的最佳呈现方式。']
                },
                {
                  title: '如何衡量成功？',
                  summary: '通过用户行为和反馈持续验证内容效果，并据此进行优化。',
                  keywords: ['衡量指标', '用户数据', '持续调优'],
                  details: ['在文案设计阶段，就需要思考最终如何度量文案的成功，以便基于用户数据对内容设计进行持续调优。']
                }
              ],
              toneVoice: {
                title: '语气语调',
                intro: [
                  '我们通过界面文案与用户“交谈”，并与用户产生情感上的连接。文案内容是“我们说什么”，语气语调则是“我们怎么说”。',
                  '同样一段话，会根据不同的交流对象、对话场景和读者心情，使用不同的语气与语调，以达成更好的沟通目的。',
                  '华为商城界面文案像一位知识渊博的朋友，以友好、尊重的方式对话：理解用户想做什么，提供恰到好处的信息，并知道何时轻松、严肃或给予安抚。'
                ],
                avoid: [
                  '流行语和网络热词',
                  '过分可爱或轻浮的表达',
                  '技术化、生僻的术语',
                  '华丽但无助于理解的修辞',
                  '非必要的感叹号',
                  '讥讽任何群体或竞争对手的措辞'
                ],
                consider: [
                  '大声朗读文案，判断表达是否自然、像真实对话。',
                  '对措辞或语气不确定时，请身边的同事一起判断。',
                  '无论如何优化语气，最重要的仍是清晰、直接地传达对用户有用的信息。'
                ],
                scale: [
                  { label: '轻松', example: '上华为商城，享智慧生活' },
                  { label: '平和', example: '已是最新版本' },
                  { label: '安抚', example: '正在加载，请稍候…' },
                  { label: '严肃', example: '删除后，订单将无法恢复。确定删除？' }
                ],
                patterns: [
                  { label: '帮助引导', tone: 'light' },
                  { label: '搜索' },
                  { label: '刷新' },
                  { label: '抢购', tone: 'calm' },
                  { label: '异常提示', tone: 'calm' },
                  { label: '分享' },
                  { label: '评论' },
                  { label: '设置' },
                  { label: '删除', tone: 'serious' },
                  { label: '我的页签' },
                  { label: '查看更多' },
                  { label: '权限', tone: 'serious' },
                  { label: '检查更新' },
                  { label: '内容订阅' },
                  { label: '卡券' },
                  { label: '隐私', tone: 'serious' },
                  { label: '空内容页面' },
                  { label: '关于' },
                  { label: '第三方品牌露出' },
                  { label: '通知' },
                  { label: '下载' },
                  { label: '筛选' },
                  { label: '地理位置选择' },
                  { label: '无障碍' },
                  { label: '启动页', tone: 'light' },
                  { label: '内容加载' }
                ],
                controls: [
                  '即时反馈 Toast', '状态按钮', '气泡提示', '底部标签', '弹出框', '子页签',
                  '文本框', '标题栏', '搜索框', '侧边导航栏', '按钮', '工具栏', '下拉按钮'
                ]
              }
            },
            {
              title: '编辑规范让不同页面保持同一种表达秩序',
              body:
                '语气语调、时间日期、标点、空格、通用词语与英文大小写共同构成基础编辑层，让规范能够跨业务、跨语言复用。',
              rules: [
                {
                  title: '时间与日期',
                  body: '统一时间点、时间段、星期与时长的显示方式，避免不同模块各自定义。',
                  columns: ['格式', '正例', '规则说明'],
                  rows: [
                    ['时间点', '2025年3月6日 08:08', '文本格式中月、日前不加前导 0；数字格式使用 2025/03/06 08:08'],
                    ['时间段', '2024/03/06～2025/03/18', '一般使用“～”连接；存在歧义时使用“至”连接'],
                    ['星期', '3月6日（星期三）', '统一显示完整“星期几”；重复周期可使用“周几”'],
                    ['时长文本', '1小时1分钟 / 1 h 1 min', '中文使用“小时、分钟”，英文使用 h、min'],
                    ['时长数字', '秒表 01:01.01 / 通话 1:01', '设立目标型显示前导 0；播放、连接型不显示前导 0']
                  ]
                },
                {
                  title: '标点规范',
                  body: '标点帮助用户理解句子关系和操作节奏，同一语境中保持中英文符号一致。',
                  columns: ['标点', '正例', '使用规则'],
                  rows: [
                    ['句号', '更多信息，请访问 https://www.vmall.com/index.html', '输入框提示、表格句子、按钮、标题与设置项二级文本通常不使用句号'],
                    ['顿号', '图片、视频、应用、文件', '并列的词或词组之间使用顿号'],
                    ['分号', '放大或缩小：轻点两下或张开双指；轻点两下或捏合双指以缩小。', '并列分句之间使用分号'],
                    ['感叹号', '出错！', '尽量少用；仅用于需要表达强烈情感、警告或鼓励的场景'],
                    ['问号', '删除后将无法恢复。确定删除？', '仅在表达询问时使用，避免与感叹号连用'],
                    ['引号', '使用“缩放”功能', '引用应用名、功能名和按键名时使用引号'],
                    ['连接号', '测量将持续 2-3 分钟 / 8月8日～8月15日', '英文短横线用于编号与号码；中文波浪线用于数值、时间或地域范围']
                  ]
                },
                {
                  title: '空格规范',
                  body: '根据字符关系决定是否加入半角空格，使中英文、数字和单位保持稳定间距。',
                  columns: ['类型', '正例', '反例／说明'],
                  rows: [
                    ['英文字符前后', '卸载 USB 存储设备', '卸载USB存储设备；英文字符前后使用半角空格'],
                    ['数字前后', '最多 32 个字符', '最多32个字符；数字前后使用半角空格'],
                    ['度量单位前', '1 MB、1024 KB、92.3 MHz', '数字与度量单位之间使用半角空格'],
                    ['英文与数字', 'There are 5 books on the table.', '英文与数字之间使用半角空格'],
                    ['百分号／货币', '20% / ¥100', '百分号、货币符号与数值之间不加空格'],
                    ['日期与时间', '2024年3月18日 / 下午2:00', '年月日前后、时间段文本与数字之间不加空格'],
                    ['符号与数字', '13.2″ / 2+3', '尺寸单位与数字、数学符号与数值之间不加空格']
                  ]
                },
                {
                  title: '通用词语',
                  body: '统一代词、助词、动词、形容词和高频名词，减少近义词与旧称混用。',
                  columns: ['类型', '统一词汇', '正例与说明'],
                  rows: [
                    ['代词', '您', '您没有发布任何内容；直接称呼用户并保持友好与尊重'],
                    ['代词', '我们 / 我', '“我们”用于强调团队责任；“我”用于表达个人所有关系'],
                    ['助词', '的 / 地 / 得', '“的”连接修饰语和名词；“地”连接修饰语和动词；“得”描述状态程度'],
                    ['动词', '请', '网络连接不稳定，请点击重试；列举时不连续使用“请”'],
                    ['动词', '创建 / 新增', '创建用于产生此前不存在的对象；新增用于增加已知类型内容'],
                    ['动词', '确定 / 确认', '“确定”强调结果；“确认”强调辨认、审核过程'],
                    ['名词', '账号', '一个用户对应一个“账号”；“账户”用于特定平台的数字资产关系']
                  ]
                },
                {
                  title: '英文大小写',
                  body: '除专有名词外使用 Sentence case；英文单词与中文之间使用半角空格。',
                  columns: ['类型', '正例', '避免使用'],
                  rows: [
                    ['浏览器名称', 'Opera 浏览器、Firefox 浏览器、Safari 浏览器', 'opera浏览器、firefox浏览器、safari浏览器'],
                    ['普通单词', 'App / Web', 'APP、app / WEB、web'],
                    ['专有写法', 'WLAN、Wi-Fi、iOS、IoT', 'WiFi、IOS、IOT'],
                    ['云服务缩写', 'SaaS、IaaS、PaaS', 'SAAS、Saas']
                  ]
                }
              ]
            },
            {
              title: '空白页面也应该告诉用户下一步怎么做',
              body:
                '每个空状态都包含插图与提示文案，并根据具体情境加入操作引导；同时区分操作无反馈、异常状态和无数据等不同类型。',
              scene: '空状态',
              points: ['说明当前发生了什么', '必要时解释形成原因', '将最可能的下一步作为操作引导'],
              images: [14],
              table: {
                columns: ['场景', '内容结构', '正例', '反例', '说明'],
                rows: [
                  [
                    { text: '场景一：操作无反馈' },
                    { text: '【描述空的原因】＋【建议解决方案】（请 XX）' },
                    { text: '没有找到您搜索的相关商品，请尝试其他搜索词' },
                    { text: '未找到“XXX”商品' },
                    { text: '用户在应用程序中搜索或筛选特定的信息与对象时，空状态页面可以帮助用户理解结果缺失或不符合期望的原因。' }
                  ],
                  [
                    { text: '场景二：异常状态\n（加载状态、网络异常）', rowSpan: 2 },
                    { text: '加载状态：【表示正在进行的词】＋【安抚】\n（建议数据加载完成后，加载状态随即消失）' },
                    { text: '正在加载，请稍候…' },
                    { text: '正在加载' },
                    { text: '/', rowSpan: 2 }
                  ],
                  [
                    { text: '无网络：【清晰表述空的原因】＋【建议解决方案】＋【引导用户做的事】\n点击底部按钮“设置网络”（跳转系统网络设置）' },
                    { text: '【提示文案】网络未连接，请检查网络设置\n【按钮】设置网络' },
                    { text: '【提示文案】网络错误\n【文本链接】无可用网络，请检查网络设置\n【按钮】刷新试试' }
                  ],
                  [
                    { text: '场景三：无数据', rowSpan: 4 },
                    { text: '用户主动／负向相关：代词“您”＋【描述空的原因】（没有）＋【内容属性】' },
                    { text: '您没有可申请的订单' },
                    { text: '没有可申请的订单' },
                    { text: '无信息的空状态页面可以提供清晰的视觉提示，描述当前存在的既定事实，以告知用户空状态为主。', rowSpan: 2 }
                  ],
                  [
                    { text: '用户被动／正向相关：【描述空的原因】（暂时没有）＋【内容属性】' },
                    { text: '暂时没有相关评价' },
                    { text: '您暂时没有相关记录。' }
                  ],
                  [
                    { text: '用户主动相关：代词“您”＋【描述空的原因】（暂时／没有）＋【内容属性】＋【引导用户做的事】（去 XX）或（请 XX）' },
                    { text: '【提示文案】您的购物车暂时没有商品\n【按钮】去购物' },
                    { text: '【提示文案】购物车空荡荡，为辛苦的自己去挑选几件商品吧\n【按钮】去购物' },
                    { text: '应用程序安装后第一次打开时，空状态页面可以告诉用户当前状态，并引导下一步操作。', rowSpan: 2 }
                  ],
                  [
                    { text: '用户被动相关：【描述空的原因】“暂时没有”＋【内容属性】＋【引导用户做的事】' },
                    { text: '【提示文案】暂时没有相关评论\n【输入框提示文案】发表评论' },
                    { text: '【提示文案】没有相关评论\n【输入框提示文案】我来说两句吧' }
                  ]
                ]
              },
              showcaseImages: [
                {
                  src: '/assets/vmall-language-system/processed/empty-state-01.png',
                  alt: '空状态示例：插图与正文',
                  title: '一、插图＋正文',
                  body: '比较主流的空状态内容形式，从传达信息的角度帮助用户理解当前所处的状态、遇到的问题以及解决方案。'
                },
                {
                  src: '/assets/vmall-language-system/processed/empty-state-02.png',
                  alt: '空状态示例：插图、正文与操作引导',
                  title: '二、插图＋正文＋操作引导',
                  body: '按钮有操作指引效果，强引导用户点击操作按钮，需要能够在异常状态的场景下真正帮助用户解决问题或缓解焦虑。'
                },
                {
                  src: '/assets/vmall-language-system/processed/empty-state-03.png',
                  alt: '空状态示例：插图、标题、正文与操作引导',
                  title: '三、插图＋标题＋正文＋操作引导',
                  body: '文本链接与提示文案强相关，紧接在消息之后，并且在视觉上与消息要有层次感。（建议在 Web 中使用）'
                }
              ]
            },
            {
              title: '删除',
              body: '',
              scene: '删除',
              table: {
                variant: 'deletion',
                columns: ['场景', '内容结构', '华为商城正例', '华为商城反例', '鸿蒙正例', '鸿蒙反例', '说明（参考句式）', '说明（参考句式）'],
                rows: [
                  [
                    { text: '场景一：\n操作不会带来负面影响', rowSpan: 2 },
                    { text: '【操作原因】＋【二次确定】', rowSpan: 2 },
                    { text: '检查更新\n检测到您的 App 版本过低，建议升级到最新版本。是否更新？\n（取消／更新）' },
                    { text: '检测到您的 APP 版本过低，请前往应用市场更新\n（取消／去更新）' },
                    { text: '“相机”需要开启定位服务为您拍摄的照片或录制的视频添加位置信息。是否允许？\n（取消／允许）' },
                    { text: '“相机”需要开启定位服务为您拍摄的照片或录制的视频添加位置信息。确定允许？' },
                    { text: '“XXX。是否 XXX？”', rowSpan: 2 },
                    { text: '按钮\n按钮让用户选择是否进行下一步动作。操作按钮应使用真实的操作内容，通常与标题栏中的动词一致，不要使用“是”或“否”。', rowSpan: 4 }
                  ],
                  [
                    { text: '撤销纠纷单提示\n撤销后，纠纷单将结束。是否撤销？\n（取消／撤销）' },
                    { text: '撤销后，纠纷单将结束，请确认是否撤销？\n（取消／确认）' },
                    { text: '为了更好的音乐体验，建议升级到最新版本。是否升级？\n（取消／升级）' },
                    { text: '为了更好的音乐体验，建议升级到最新版本。确定升级？' }
                  ],
                  [
                    { text: '场景二：\n操作会带来负面影响', rowSpan: 2 },
                    { text: '【操作影响】＋【二次确定】', rowSpan: 2 },
                    { text: '您编辑的地址尚未保存。确定离开？\n（离开／返回修改）', rowSpan: 2 },
                    { text: '编辑的地址未保存。请确认是否离开？\n（放弃／返回修改）', rowSpan: 2 },
                    { text: '当前非 WLAN 网络，使用移动数据会影响视频质量并消耗流量。确定播放？\n（取消／播放）' },
                    { text: '当前非 WLAN 网络，使用移动数据会影响视频质量并消耗流量。是否播放？\n（取消／播放）' },
                    { text: '“XXX。确定 XXX？”', rowSpan: 2 }
                  ],
                  [
                    { text: '此操作将终止本机的畅联服务，并永久清除服务器端关联数据。确定解除？\n（取消／解除）' },
                    { text: '此操作将终止本机的畅联服务，并永久清除服务器端关联数据。是否解除？\n（取消／解除）' }
                  ]
                ]
              },
              comparisonCards: [
                {
                  title: '场景一：操作不会带来负面影响',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/deletion/scene-1-current-cart.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/scene-1-proposed-cart.jpg',
                      alt: '购物车删除弹窗'
                    },
                    {
                      current: '/assets/vmall-language-system/processed/deletion/scene-1-current-message.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/scene-1-proposed-message.jpg',
                      alt: '消息删除弹窗'
                    },
                    {
                      current: '/assets/vmall-language-system/processed/deletion/scene-1-current-address.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/scene-1-proposed-address.jpg',
                      alt: '地址删除弹窗'
                    }
                  ]
                },
                {
                  title: '场景二：操作会带来负面影响',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/deletion/scene-2-current-order.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/scene-2-proposed-order.jpg',
                      alt: '订单删除弹窗'
                    }
                  ]
                }
              ]
            },
            {
              title: '确定弹出框',
              body: '',
              scene: '确定弹出框',
              tableSource: '删除',
              comparisonCards: [
                {
                  title: '场景一：操作不会带来负面影响',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/deletion/confirm-scene-1-current-update.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/confirm-scene-1-proposed-update.jpg',
                      alt: '检查更新确定弹出框'
                    },
                    {
                      current: '/assets/vmall-language-system/processed/deletion/confirm-scene-1-current-dispute.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/confirm-scene-1-proposed-dispute.jpg',
                      alt: '撤销纠纷单确定弹出框'
                    }
                  ]
                },
                {
                  title: '场景二：操作会带来负面影响',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/deletion/confirm-scene-2-current-address.jpg',
                      proposed: '/assets/vmall-language-system/processed/deletion/confirm-scene-2-proposed-address.jpg',
                      alt: '离开地址编辑确定弹出框'
                    }
                  ]
                }
              ]
            },
            {
              title: '异常提示、检查更新、更多帮助',
              body: '',
              scene: '异常提示、检查更新、更多帮助',
              table: {
                variant: 'support',
                columns: ['场景', '内容结构', '华为商城正例', '华为商城反例', '鸿蒙正例', '鸿蒙反例'],
                rows: [
                  [
                    { text: '登录异常', rowSpan: 2 },
                    { text: '【异常描述】＋【解决方案】', rowSpan: 2 },
                    { text: '账号或密码错误，请重新输入', rowSpan: 2 },
                    { text: '密码输入错误，请重新输入', rowSpan: 2 },
                    { text: '账号或密码错误，请重新输入。' },
                    { text: '用户名或密码错误，请重输。' }
                  ],
                  [
                    { text: '登录已失效，请重新登录。' },
                    { text: '登录已失效' }
                  ],
                  [
                    { text: '超限异常', rowSpan: 2 },
                    { text: '“XXX 已达到上限”', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '输入次数已达到上限' },
                    { text: '您的输入已达到最大次数限制' }
                  ],
                  [
                    { text: '输入字数已达到上限' },
                    { text: '您输入的内容已经达到字数上限' }
                  ],
                  [
                    { text: '检查更新', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '有新版本' },
                    { text: '发现新版本' },
                    { text: '有新版本' },
                    { text: '检测到系统有新版本' }
                  ],
                  [
                    { text: '已是最新版本' },
                    { text: '已经是最新版本' },
                    { text: '已是最新版本' },
                    { text: '您当前使用的已经是最新版本' }
                  ],
                  [
                    { text: '更多帮助', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '/', rowSpan: 2 },
                    { text: '有关 XXX 的更多信息，请参阅 XXX' },
                    { text: '如果您想了解更多关于 XXX 的详细资料，请阅读 XXX。' }
                  ],
                  [
                    { text: '了解更多' },
                    { text: '获取更多帮助' }
                  ]
                ]
              },
              featureCards: [
                {
                  title: '登录异常',
                  src: '/assets/vmall-language-system/processed/support/login-error.jpg',
                  alt: '账号或密码错误提示示例'
                },
                {
                  title: '检查更新',
                  src: '/assets/vmall-language-system/processed/support/check-update.jpg',
                  alt: '检查更新入口示例'
                },
                {
                  title: '更多帮助',
                  src: '/assets/vmall-language-system/processed/support/more-help.jpg',
                  alt: '购买服务商品帮助提示示例'
                }
              ]
            },
            {
              title: '异常提示—失败提示',
              body: '',
              scene: '异常提示—失败提示',
              table: {
                variant: 'failure',
                columns: ['场景', '内容结构', '华为商城正例', '华为商城反例', '鸿蒙正例', '鸿蒙反例', '说明（参考句式）'],
                rows: [
                  [
                    { text: '场景一：\n失败原因不明确', rowSpan: 2 },
                    { text: '【失败结果】＋【解决方案】', rowSpan: 2 },
                    { text: '支付失败，请选择其他支付方式或再试一次。', rowSpan: 2 },
                    { text: '支付失败', rowSpan: 2 },
                    { text: '查询数据失败，请稍后再试' },
                    { text: '查询数据失败' },
                    { text: '“XXX 失败，请 XXX。”', rowSpan: 2 }
                  ],
                  [
                    { text: '网络连接已中断，请检查网络设置' },
                    { text: '网络连接已中断' }
                  ],
                  [
                    { text: '场景二：\n失败原因明确，解决方案可根据失败原因排查。' },
                    { text: '【失败原因】＋【失败结果】' },
                    { text: '已超出购物车商品数量上限，添加商品失败' },
                    { text: '添加商品失败，已超出购物车商品数量上限' },
                    { text: '云空间不足，文件上传失败' },
                    { text: '文件上传失败' },
                    { text: '“XXX，XXX 失败。”' }
                  ],
                  [
                    { text: '场景三：\n失败原因、解决方案均明确' },
                    { text: '【失败结果】＋【失败原因】＋【解决方案】' },
                    { text: '/' },
                    { text: '/' },
                    { text: '下载失败。华为账号登录状态已失效，请重新登录' },
                    { text: '/' },
                    { text: '“XXX 失败。XXX，请 XXX。”' }
                  ]
                ]
              },
              comparisonCards: [
                {
                  title: '场景一：失败原因不明确',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/failure/payment-current.jpg',
                      proposed: '/assets/vmall-language-system/processed/failure/payment-proposed.jpg',
                      alt: '支付失败提示'
                    }
                  ]
                },
                {
                  title: '场景二：失败原因明确',
                  pairs: [
                    {
                      current: '/assets/vmall-language-system/processed/failure/cart-current.jpg',
                      proposed: '/assets/vmall-language-system/processed/failure/cart-proposed.jpg',
                      alt: '添加商品失败提示'
                    }
                  ]
                }
              ]
            },
            {
              title: '帮助引导-全屏引导型',
              body: '',
              scene: '帮助引导-全屏引导型',
              table: {
                variant: 'guidance',
                columns: ['场景', '内容结构', '华为商城正例', '华为商城反例', '鸿蒙正例', '鸿蒙反例', '说明（参考句式）', '补充说明'],
                rows: [
                  [
                    { text: '场景一：\n教用户如何使用' },
                    { text: '标题：【特性操作】＋【操作目的】\n二级文本：【明确的用户操作】＋【明确的操作目的】' },
                    { text: '扫描二维码／条码\n对准二维码／条码，即可自动扫描' },
                    { text: '二维码／条码\n扫描二维码／条码即可' },
                    { text: '扫描物品，轻松查百科\n支持识别花草、汽车、宠物等，获取相关百科信息。更多类别的物体识别将陆续开放' },
                    { text: '识物\n扫描花草、汽车、宠物等，即可查询对应的百科知识' },
                    { text: '1. 二级文本可省略主语“您”，完整表达为：（您只需）XXX，即可 XXX。\n2. 固定句式“……，即可……”。' },
                    { text: '1. 标题不超过 10 个字符；辅助文本以 22 个字符以内为佳，不超过 44 个字符。\n2. 体现功能的独特卖点，避免泛泛而谈。\n3. 简明扼要，恰好满足用户首次使用的信息诉求，不过多也不过少。\n4. 选择目标用户熟悉、易懂的词语，轻松友好地交谈，避免技术化、生僻词与夸大营销。', rowSpan: 3 }
                  ],
                  [
                    { text: '场景二：\n告知系统会做什么' },
                    { text: '标题：【特性名称】\n二级文本：【使用场景】＋【系统会执行的操作】＋【操作目的】' },
                    { text: '同步系统字体大小\n开启“同步字体大小”后，将重启应用，并展示系统设置的字体大小', rowSpan: 2 },
                    { text: '同步系统字体大小\n重启应用，展示系统设置的字体大小', rowSpan: 2 },
                    { text: '纯净模式\n安装应用时，系统会自动识别应用来源，保证每一次安装的纯净可靠' },
                    { text: '纯净模式\n应用来源受管控，用户权益有保障' },
                    { text: '1. 主语为“系统”或“特性”。不影响句意时，可省略主语。\n2. 无使用场景限制时，可省略“使用场景”；操作目的明确时，可省略“操作目的”。' }
                  ],
                  [
                    { text: '场景三：\n告知用户可利用此功能做什么' },
                    { text: '标题：【特性名称】\n二级文本：【用户可用此功能做什么】' },
                    { text: '智慧多窗\n您可以通过悬浮窗或分屏的方式同时使用多个应用' },
                    { text: '智慧多窗\n以悬浮窗或分屏浏览的方式智能打开多个窗口' },
                    { text: '1. 主语使用“您”。\n2. 固定句式“您可以……”。' }
                  ]
                ]
              },
              textCards: [
                {
                  title: '场景一：教用户如何使用',
                  items: [
                    {
                      label: '标题',
                      text: '扫描二维码／条码',
                      notes: ['明确的用户操作']
                    },
                    {
                      label: '二级文本',
                      text: '对准二维码／条码，即可自动扫描',
                      notes: ['明确的用户操作', '明确的操作目的']
                    }
                  ]
                },
                {
                  title: '场景二／三：说明系统能力与用户收益',
                  items: [
                    {
                      label: '标题',
                      text: '同步系统字体大小',
                      notes: ['特性名称']
                    },
                    {
                      label: '二级文本',
                      text: '开启后将重启应用，并同步系统字体大小',
                      notes: ['系统会执行的操作', '用户可用此功能做什么']
                    }
                  ]
                }
              ]
            },
            {
              title: '设置',
              body: '',
              scene: '设置',
              introColumns: [
                {
                  title: '设置标题',
                  groups: [
                    {
                      label: '应注意',
                      points: ['用词简短而有意义', '重要的信息先说', '同类标题结构一致、词性一致']
                    },
                    {
                      label: '应避免',
                      points: ['用词模糊抽象', '重复上级标题内容', '目标用户不熟悉的技术术语']
                    }
                  ]
                },
                {
                  title: '设置项二级文本',
                  body: '二级文本可帮助用户更好地了解设置项设置后会发生什么，或用户可以利用此功能做什么。如果设置标题足以说明，则无需添加二级文本。'
                }
              ],
              table: {
                variant: 'settings',
                columns: ['场景', '内容结构', '华为商城正例', '华为商城反例', '鸿蒙正例', '鸿蒙反例', '说明（参考句式）', '补充说明'],
                rows: [
                  [
                    { text: '场景一：\n设置后系统会发生什么（正向）' },
                    { text: '【使用场景】＋【设置后系统会发生什么（正向）】' },
                    { text: '个性化推荐\n开启后，华为商城将根据您的使用习惯，为您推荐更合适的产品。' },
                    { text: '个性化推荐\n开启后，华为商城将根据您的使用习惯，收集使用习惯、操作记录，为您推荐更合适的产品' },
                    { text: '应用锁\n打开加锁应用前系统会进行身份验证，保护隐私安全' },
                    { text: '应用锁\n即应用的保护锁。启动加锁应用前会进行身份验证，以确保机主本人使用，保护隐私安全' },
                    { text: '1. 主语为“系统”或“特性”。不影响句意时，可省略主语。\n2. 无使用场景限制时，可省略“使用场景”；操作目的明确时，可省略“操作目的”。' },
                    { text: '1. 二级文本以 22 个字符以内为佳，不超过 44 个字符。\n2. 客观清晰地概括功能含义，避免以偏概全。\n3. 简明扼要，只体现支撑用户决策的必要信息，不过多也不过少。\n4. 选择目标用户熟悉、易懂的词语，客观友好地交谈，避免技术化、生僻词与夸大营销。', rowSpan: 3 }
                  ],
                  [
                    { text: '场景二：\n设置后系统会发生什么（包含负向影响）' },
                    { text: '【开启后会发生什么（正向）】＋【需告知用户的影响】' },
                    { text: '/' },
                    { text: '/' },
                    { text: '低电量模式\n预计继续使用 5 小时 18 分钟\n可提升续航时间，但会关闭 5G、熄屏显示、自动同步等功能\n了解更多' },
                    { text: '低电量模式\n预计继续使用 5 小时 18 分钟\n将关闭 5G、熄屏显示、自动同步等功能，限制应用后台活动，减弱视觉效果\n了解更多' },
                    { text: '1. 主语为“系统”或“特性”。不影响句意时，可省略主语。\n2. 无使用场景限制时，可省略“使用场景”；操作目的明确时，可省略“操作目的”。\n3. 负向影响尽量描述客观、用户可感知的重点，更多信息可通过“了解更多”逐步呈现。' }
                  ],
                  [
                    { text: '场景三：\n设置后用户可利用此功能做什么事' },
                    { text: '【开启后用户可利用此功能做什么】' },
                    { text: '用户体验提升服务\n允许华为商城收集相关网络信息和系统日志信息，用于提升用户体验。' },
                    { text: '用户体验提升服务\n允许收集您的相关网络信息和系统日志信息，用于提升在商城内的操作使用体验' },
                    { text: '多设备图库浏览\n您可以在手机、平板或智慧屏等任一设备的图库中，浏览或搜索其他同账号设备的照片或视频' },
                    { text: '多设备图库浏览\n在手机、平板或智慧屏上登录同一华为账号，即可在本设备的图库应用中，浏览或搜索其他设备中的照片和视频' },
                    { text: '1. 主语使用“您”。\n2. 固定句式“您可以……”。' }
                  ]
                ]
              },
              settingCards: [
                {
                  title: '场景一：设置后系统会发生什么',
                  exampleTitle: '个性化广告',
                  exampleBody: '开启后，华为商城将根据您的使用习惯，为您推荐更合适的产品',
                  note: '开启后系统会执行的操作',
                  src: '/assets/vmall-language-system/processed/settings/content-recommendation.jpg',
                  alt: '内容推荐服务设置案例'
                },
                {
                  title: '场景二：设置后用户可利用此功能做什么',
                  exampleTitle: '用户体验提升服务',
                  exampleBody: '允许华为商城收集相关网络信息和系统日志信息，用于提升用户体验',
                  note: '开启后，用户可利用此功能做什么',
                  src: '/assets/vmall-language-system/processed/settings/privacy.jpg',
                  alt: '隐私设置用户体验提升服务案例'
                }
              ]
            }
          ]
        }
      },
      {
        id: 'app-vmall-smart-service-2',
        title: '华为商城智能客服',
        year: '2022',
        type: '客服系统',
        summary:
          '基于小艺智能客服能力，拓展 VMALL 售前后问询场景，统一交互体验与视觉表达。',
        color: '#B9DDFF',
        coverVariant: 'vmall-smart-service',
        coverImage: '/assets/vmall-smart-service-2/cover-handheld-clean-v5.png',
        coverImageAlt: '华为商城智能客服手持手机封面',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'APP / Intelligent Customer Service',
          image: '/assets/vmall-smart-service-2/gallery.jpg',
          imageAlt: '华为商城智能客服 2.0 项目图集',
          statement:
            '基于 2022 年 H4 客服功能拓展诉求，承接 HUAWEI CBG 小艺智能客服产品能力，为 VMALL 提供产品咨询及物流、订单、价保、发票等售前后智能问询，并完成交互体验与视觉一致性升级。'
        }
      },
      {
        id: 'app-vplus-membership',
        title: 'V+ 会员',
        year: '2023',
        type: '会员体系',
        summary:
          '围绕开通、权益认知与商城消费，整合专享优惠、积分回馈和会员服务，打造清晰一致的 V+ 会员体验。',
        color: '#F1F3F5',
        coverImage: '/assets/vplus-membership/cover.jpg',
        coverImageAlt: 'V+ 会员封面',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'APP / Membership Experience',
          image: '/assets/vplus-membership/gallery.jpg',
          imageAlt: 'V+ 会员产品体验项目图集',
          statement:
            'V+ 会员围绕用户从开通、权益认知到商城消费的完整链路，整合优先购、专享优惠、会员价、积分回馈与专属服务，并通过会员中心、商城专区、优惠券和订单状态等核心场景，打造清晰一致、可持续感知的高价值会员体验。'
        }
      },
      {
        id: 'app-vmall-polaris',
        title: '北极星数据监控平台',
        year: '2022',
        type: '数据工具',
        summary:
          '汇聚商城核心经营指标，帮助团队随时掌握业务变化并快速定位问题。',
        color: '#FF5360',
        coverVariant: 'vmall-polaris',
        coverLogo: '/assets/vmall-polaris/logo.svg',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'APP / Data Monitoring Platform',
          image: '/assets/vmall-polaris/gallery.jpg',
          imageAlt: '北极星数据监控平台移动端界面合集',
          statement:
            '北极星数据监控平台面向商城经营与运营团队，将销售、流量、用户、商品、商家与服务等核心指标整合到移动端。通过实时概览、趋势对比与多维下钻，让团队随时掌握业务变化，更快发现异常、定位问题并支持经营决策。'
        }
      }
    ]
  },
  web: {
    title: '网页与品牌站',
    kicker: '网页',
    projects: [
      {
        id: 'web-funnyfuzzy-homepage',
        title: 'FunnyFuzzy商城首页设计',
        year: '2026',
        type: '网页设计',
        summary: '围绕品牌表达、商品探索与双端体验，完成 FunnyFuzzy 商城首页的系统性改版。',
        color: '#F3F3F0',
        coverImage: '/assets/funnyfuzzy-homepage/cover.png',
        coverImageAlt: '绿色沙发上的电脑展示 FunnyFuzzy 商城首页首屏',
        caseStudy: {
          template: 'funnyfuzzy-homepage',
          intro:
            '从真实的浏览与点击问题出发，把 FunnyFuzzy 首页从商品与活动的堆叠，重构为一条兼顾品牌感、商品发现与购买决策的场景化购物路径。',
          facts: [
            { label: '品牌', value: 'FunnyFuzzy' },
            {
              label: '状态',
              value: '已上线',
              linkLabel: 'funnyfuzzy.com',
              href: 'https://funnyfuzzy.com/'
            },
            { label: '角色', value: '设计与策略' },
            { label: '范围', value: '研究、框架、设计' }
          ]
        }
      },
      {
        id: 'web-uom',
        title: 'UOM',
        year: '2024',
        type: '后台系统',
        summary:
          '从 100+ 个真实运营体验问题出发，统一公共组件、页面规范与研发能力，让分散建设的商城后台逐步形成可复用、可持续上线的产品体系。',
        color: '#EEF3FB',
        coverVariant: 'uom',
        coverImage: '/assets/uom/uom-cover.jpg',
        coverImageAlt: 'UOM 华为商城运营管理后台项目封面',
        caseStudy: {
          template: 'uom',
          eyebrow: 'WEB / Operation Management System',
          intro:
            'UOM 是华为商城面向运营、产品与业务团队的统一运营管理平台，承载商品、营销、订单、服务及平台配置等日常后台任务，覆盖从查询、创建、审核到批量维护的核心工作流程。',
          facts: [
            { label: '品牌', value: '华为商城' },
            { label: '状态', value: '已上线' },
            { label: '角色', value: 'UX / 规范设计' },
            { label: '范围', value: '研究、规范、组件、页面' }
          ],
          target: {
            title: '围绕华为商城 UOM 后台，从真实业务反馈出发，系统盘点组件、页面与公共能力，完成问题归因、规范升级和组件线上化，减少重复建设与协作成本，沉淀可复用、可持续演进的运营产品能力。',
            cardTitle: '项目计划',
            body: '以统一规则和公共能力为核心，建立从问题发现到设计、研发与上线协同落地的长期治理机制。',
            stages: [
              {
                title: '体验反馈',
                body: '2024 年 7—9 月基于业务反馈与产品自检，盘点 30 个组件及样式，梳理 100+ 个体验问题。'
              },
              {
                title: '能力分析',
                body: '汇总 UOM 23 项公共能力与 17 个典型页面，识别缺失、重复与低效环节。'
              },
              {
                title: '规范升级',
                body: '新页面统一使用最新组件与样式，存量页面优先整改 TOP50 高频菜单。'
              },
              {
                title: '线上化',
                body: '2024 年 12 月完成 PIXSO 规范与团队赋能，2025 年 H1 持续推进核心菜单整改。'
              }
            ]
          },
          metrics: [
            {
              value: '30',
              unit: '个',
              label: '组件及样式',
              body: '结合业务反馈与产品自检，系统盘点后台公共能力。'
            },
            {
              value: '100+',
              unit: '',
              label: '体验问题',
              body: '从效率、一致性、规范遵从与组件可用性四类问题归因。'
            },
            {
              value: '23',
              unit: '项',
              label: '公共能力',
              body: '覆盖选择、搜索、表格、上传、日志与导航等高频任务。'
            },
            {
              value: '17',
              unit: '个',
              label: '典型页面',
              body: '将分散组件能力重新组织为可验证、可复用的页面模型。'
            }
          ],
          issueTypes: [
            {
              id: 'missing',
              title: '缺少可用组件',
              color: '#6993ff',
              body: '多选、回到顶部、返回与操作日志等高频能力需要业务重复建设。',
              feedback: [
                { role: '商品运营', quote: '几百条活动商品只能逐项勾选，批量调整一次要重复操作很久。' },
                { role: '订单运营', quote: '审核完返回列表，筛选条件又清空了。' },
                { role: '营销运营', quote: '规则是谁改的、什么时候改的，现在都查不到。' },
                { role: '平台运营', quote: '页面很长，处理完还要一直滚回顶部。' },
                { role: '服务运营', quote: '想同时处理几条工单，但只能逐条进入、逐条提交。' },
                { role: '商家运营', quote: '编辑到一半离开页面，没有暂存，只能重新填写。' },
                { role: '内容运营', quote: '上线前看不到最终效果，只能凭经验判断。' },
                { role: '产品经理', quote: '相同能力每个业务都在重新提需求、重新评审，研发也在重复建设。' },
                { role: '审核人员', quote: '处理完一条还要手动返回列表，连续审核特别慢。' }
              ]
            },
            {
              id: 'fragmented',
              title: '组件过多无统一',
              color: '#6993ff',
              body: '时间、人员选择等相同任务存在多套实现，交互与维护成本持续增加。',
              feedback: [
                { role: '营销运营', quote: '同样是选择活动时间，有的页面能选到分钟，有的只能选日期。' },
                { role: '内容运营', quote: '换一个模块，人员选择器就像换了一个系统。' },
                { role: '商品运营', quote: '素材入口和格式限制不统一，经常提交后才发现不符合要求。' },
                { role: '平台运营', quote: '有的返回上一级，有的直接退出任务，很难形成固定习惯。' },
                { role: '订单运营', quote: '分页样式有好几种，有些甚至不能直接跳页。' },
                { role: '服务运营', quote: '搜索位置和默认条件总在变，熟悉的方法没法复用。' },
                { role: '研发人员', quote: '同一功能维护了好几套代码，修一个问题要同步多个版本。' },
                { role: '商家运营', quote: '有的详情开新页，有的开弹窗，还有的会覆盖当前页面。' },
                { role: '审核人员', quote: '日期格式每个页面都不一样，核对记录时特别费劲。' },
                { role: '产品经理', quote: '需求文档里总要重复解释相同的交互规则。' }
              ]
            },
            {
              id: 'compliance',
              title: '未遵从规范',
              color: '#6993ff',
              body: '按钮、面包屑与选择器在不同模块中自行定夺，局部页面体验不一致。',
              feedback: [
                { role: '商品运营', quote: '同样的蓝色按钮，有时是提交，有时却是查询。' },
                { role: '订单运营', quote: '面包屑能不能点，从样式上完全看不出来。' },
                { role: '营销运营', quote: '筛选区的展开方式不同，常用条件也没有固定位置。' },
                { role: '内容运营', quote: '弹窗里的确认和取消顺序不一致，忙的时候很容易点错。' },
                { role: '商家运营', quote: '标题、间距和字号差别很大，看起来像多个系统拼在一起。' },
                { role: '测试人员', quote: '规范没有落到组件，每次验收仍要重新核对样式和交互。' },
                { role: '平台运营', quote: '必填项提示有好几种，经常提交后才知道漏填。' },
                { role: '服务运营', quote: '成功提示出现得太快，有时都没看清任务是否生效。' },
                { role: '审核人员', quote: '同一个状态在不同页面用了不同颜色，很容易判断错。' },
                { role: '研发人员', quote: '没有统一组件约束，页面做完后还要反复对齐细节。' },
                { role: '产品经理', quote: '相同的业务动作在不同模块里，名称和入口都不一致。' }
              ]
            },
            {
              id: 'usability',
              title: '组件不好用',
              color: '#6993ff',
              body: '表格、分页和搜索虽然存在，但难以支持复杂运营任务。',
              feedback: [
                { role: '商品运营', quote: '关键信息都折叠在表格里，每一行都要点开核对。' },
                { role: '平台运营', quote: '菜单层级太深，新同事根本不知道功能在哪。' },
                { role: '订单运营', quote: '翻页查看详情后再返回，总会跳回第一页，处理进度很容易丢。' },
                { role: '营销运营', quote: '搜索只能按一个条件查，找一批目标信息要反复筛选。' },
                { role: '内容运营', quote: '表格列太多又不能固定重点字段，横向滚动后就看不清是哪一条。' },
                { role: '商家运营', quote: '只提示操作失败，却不告诉我哪里有问题、下一步怎么改。' },
                { role: '新入职运营', quote: '功能名称很专业，也没有指引，第一次很难独立完成任务。' },
                { role: '服务运营', quote: '筛选项很多，但不能保存每天都要用的条件组合。' },
                { role: '审核人员', quote: '信息密度太高，真正需要确认的字段反而找不到。' }
              ]
            }
          ],
          analysis: {
            title: '能力现状与设计拆解',
            body: '对 UOM 公共组件能力进行拆解后，问题并不只来自组件缺失，更来自模块自治与规范缺少落地机制。',
            rootCauses: [
              'BP、MS、CP、BDS 四大业务域长期独立建设，缺少统一组件约束，导致相同能力在不同模块中被重复设计与实现。',
              'AXURE 模板虽然覆盖低保、高保、开发与验收环节，但产品遵从、研发实现和测试验收之间缺少统一的执行标准。'
            ],
            painPoints: [
              '各模块独立开发，局部页面体验不一致',
              '规范停留在文档，缺少有效遵从机制'
            ],
            appeals: [
              '补齐并优化 UOM 组件的交互与样式规则，让新增和存量页面使用同一判断标准。',
              '让产品经理可直接使用 PIXSO 规范和低代码工具，降低低保设计与沟通成本。',
              '将 UX 公共能力转化为研发组件，并纳入引用、测试和验收流程。'
            ]
          },
          goals: [
            ['完善 UX 规范', '补齐组件交互与样式规则，确保不同业务使用同一判断标准。'],
            ['实用的低代码工具', '让产品经理能够直接使用规范能力，减少低保真设计复杂度。'],
            ['可引用的开发组件', '将公共能力落实为研发侧组件，缩短设计到上线的链路。']
          ],
          capabilities: ['导航菜单', '全局搜索', '历史页签', '操作指引'],
          pageTypes: [
            {
              label: '定制开发页面',
              value: 60,
              priority: '高',
              scope: '商品、营销、订单、服务、商家与平台运营',
              actions: ['优先整改 TOP50 高频访问菜单', '其他页面随版本迭代更新至最新组件']
            },
            {
              label: '嵌入页面',
              value: 20,
              priority: '中',
              scope: 'EOMS、SHOPDC、流量联盟与数据中心',
              actions: ['存量嵌入页面暂不整体调整', '根据新增场景持续维护公共控件']
            },
            {
              label: 'DSL 开发页面',
              value: 10,
              priority: '低',
              scope: '会员中心、系统管理与平台配置',
              actions: ['新增重要页面引入 UX 设计', '存量 DSL 页面逐步维护新规范']
            }
          ],
          menuRanking: [
            ['发票管理', 290],
            ['串付管理', 210],
            ['退换货管理', 196],
            ['退换货管理（新）', 134],
            ['商品销售配置', 132],
            ['商品销量配置', 122]
          ],
          releaseFlow: [
            { role: '运营', task: '用户体验反馈' },
            { role: '产品', task: '组件能力分析' },
            { role: 'UX', task: '交互设计方案' },
            { role: 'UX', task: 'UI 视觉方案' },
            { role: '研发', task: '按节奏开发' }
          ],
          versions: [
            {
              version: '25.1',
              title: '先解决高频查询与选择',
              items: [
                { component: '选择器（多选）', pain: '当前缺少多选能力，无法满足业务同时查看和处理多组数据的诉求。', outcome: '支持模糊搜索匹配，并提供全选与重置。' },
                { component: '日期选择器', pain: '时间组件使用不统一，运营选择时间存在风险，交互理解成本较高。', outcome: '同时支持日期与时间选择，统一默认起始时间。' },
                { component: '表格 / 分页 / 留痕 / 按钮', pain: '展示内容受限且样式不统一，容易误操作，查询和核对效率较低。', outcome: '支持表头与操作区冻结、列拖动、更多参数展示及上下条浏览。' },
                { component: '全局菜单搜索', pain: '新员工或低频使用者难以在多层菜单中快速找到目标功能。', outcome: '提供全局菜单搜索、无权限提示与历史搜索缓存。' }
              ]
            },
            {
              version: '25.3',
              title: '补齐长页面与人员操作',
              items: [
                { component: '面包屑 + 返回', pain: '不同页面的返回方式和位置不一致，影响连续任务处理效率。', outcome: '面包屑与返回统一放在页面上方，返回操作以右上区域为主。' },
                { component: '人员展示（名字 + 工号）', pain: '只展示工号时无法直观判断操作者，协作核对成本较高。', outcome: '列表和日志涉及人员时，同时展示姓名与工号。' },
                { component: '人员选择器', pain: '人员选择方式过多且标准不同，存在选择错误风险。', outcome: '统一支持通过姓名与工号检索、选择人员。' },
                { component: '回到顶部', pain: '长页面无法直接回到顶部，需要持续滚动才能继续操作。', outcome: '页面超过一定屏数后显示回到顶部按钮。' },
                { component: '页签', pain: '页签样式与选中反馈不统一，切换关系不够直观。', outcome: '统一选中态、切换反馈和内容区域的对应关系。' }
              ]
            },
            {
              version: '25.5',
              title: '完善审核与内容管理',
              items: [
                { component: '操作日志', pain: '部分菜单缺少操作日志，出现问题后无法追溯具体操作人。', outcome: '关键页面保留操作日志与审核日志。' },
                { component: '上传及预览', pain: '支持的文件和模板不明确，上传图片也缺少清晰的大图预览。', outcome: '导入提供模板，创建页明确文件类型，并支持大图预览。' },
                { component: '页面即将掉线提醒', pain: '长时间编辑后页面掉线，刷新会重置内容并影响当前操作。', outcome: '提前 5 分钟倒计时提醒，刷新后保留当前页面操作。' },
                { component: '基础信息组件', pain: 'Tips、必填项等基础信息未统一遵循展示规范。', outcome: '统一 Tips、必填标识和基础信息的展示方式。' }
              ]
            }
          ],
          principles: [
            ['一致性', '产品体验一致'],
            ['效率', '产研设计效率提升'],
            ['协作', '全链路协同']
          ],
          atomicLevels: [
            {
              title: '原子',
              english: 'Atoms',
              icon: '/assets/uom/atomic-levels/atoms.svg',
              definition: '不可继续拆分的视觉与交互基础，是后台体验保持一致的最小单位。',
              items: ['色彩', '字体', '栅格', '间距', '圆角']
            },
            {
              title: '分子',
              english: 'Molecules',
              icon: '/assets/uom/atomic-levels/molecules.svg',
              definition: '由多个原子组合而成的基础控件，承接后台任务中最常见的输入与选择动作。',
              items: ['输入框', '选择器', '时间选择', '上传', 'Checkbox']
            },
            {
              title: '组织',
              english: 'Organisms',
              icon: '/assets/uom/atomic-levels/organisms.svg',
              definition: '将基础控件组织为可独立完成一类任务的复杂组件，形成稳定的信息与操作结构。',
              items: ['菜单', '导航', '表格', '表单', '筛选']
            },
            {
              title: '模块',
              english: 'Templates',
              icon: '/assets/uom/atomic-levels/templates.svg',
              definition: '按照运营任务编排多个组织组件，明确页面区域之间的职责、顺序与协作关系。',
              items: ['过滤区', '信息区', '操作区', '卡片', '弹窗']
            },
            {
              title: '页面',
              english: 'Pages',
              icon: '/assets/uom/atomic-levels/pages.svg',
              definition: '面向真实业务场景的完整任务界面，是规则、组件与流程共同作用的最终载体。',
              items: ['创建', '审核', '查看', '编辑', '提交']
            }
          ],
          gallery: [
            {
              src: '/assets/uom/uom-design-showcase.jpg',
              alt: 'UOM 车商品管理、运营单创建、选配组合与商品价格设计展示',
              title: '将统一规范落入真实运营任务与关键业务流程'
            }
          ]
        }
      },
      {
        id: 'web-amazon-store-home',
        title: 'Amazon店铺首页设计',
        year: '2026',
        type: '网页改版',
        summary:
          '从市场、竞品与现网体验出发，重新组织 FUNNYFUZZY Amazon 店铺的品牌表达、品类路径与双端购物节奏。',
        color: '#F3F3F0',
        coverVariant: 'amazon-store',
        caseStudy: {
          template: 'amazon-store-home',
          eyebrow: 'WEB / E-commerce Homepage',
          intro:
            '为 FUNNYFUZZY 重新设计 Amazon 店铺首页，让品牌认知、类目导航与商品转化在桌面端和移动端上形成一致、可扫读的购物路径。',
          facts: [
            { label: '品牌', value: 'FUNNYFUZZY' },
            {
              label: '状态',
              value: '已上线',
              linkLabel: 'amazon.com/stores/...',
              href: 'https://www.amazon.com/stores/FUNNYFUZZY/page/8D6886E5-4C22-46EE-84D6-F5692AD9D7BA?lp_asin=B0FLXP176F&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto'
            },
            { label: '角色', value: '设计与策略' },
            { label: '范围', value: '研究、框架、设计' }
          ]
        }
      },
      {
        id: 'web-bujiaban-smart-material-tool',
        title: '布家班',
        year: '2022',
        type: '工具设计',
        summary:
          '预置 50+ 种常用站外物料尺寸与 30+ 套设计模板，设计师上传 Logo、背景、产品图与文案后，即可智能批量生成素材，并串联运营审核与下载交付流程。',
        color: '#573eff',
        coverVariant: 'bujiaban',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'WEB / Smart Design Tool',
          image: '/assets/bujiaban-smart-material-tool/gallery.jpg',
          imageAlt: '布家班智能物料设计工具项目图集',
          statement:
            '布家班智能物料设计工具，预置 50+ 种常用站外物料尺寸与 30+ 套设计模板。设计师只需上传 Logo、背景、产品图与文案，即可智能批量生成多尺寸素材，并将结果流转至运营端审核、下载，让物料生产从重复排版转向高效、可协作的标准化流程。'
        }
      },
      {
        id: 'web-huawei-cloud-product-pages',
        title: '华为云产品页设计',
        year: '2019',
        type: '页面设计',
        summary: '围绕华为云官网产品页、解决方案页与多语言页面，整理企业级信息排版与页面视觉一致性。',
        color: '#FFAC33',
        coverVariant: 'huawei-cloud',
        coverImage: '/assets/huawei-cloud/product-pages-cover.jpg',
        coverImageAlt: '华为云产品页设计封面',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'WEB / Product Pages',
          image: '/assets/huawei-cloud/product-pages-collage.jpg',
          imageAlt: '华为云产品页设计合集',
          statement:
            '为 HUAWEI CLOUD 官网产品页、解决方案页与多语言产品页面建立清晰的页面视觉。在高密度信息、企业级品牌规范和多业务场景之间，保持层级、节奏与一致识别。'
        }
      },
      {
        id: 'web-huawei-cloud-campaign-pages',
        title: '华为云活动页设计',
        year: '2019',
        type: '页面设计',
        summary: '围绕华为云大促、专题活动和品牌发布场景，整理活动页视觉、节奏和转化模块的页面表达。',
        color: '#FFAC33',
        coverVariant: 'huawei-cloud',
        coverImage: '/assets/huawei-cloud/campaign-pages-cover.jpg',
        coverImageAlt: '华为云活动页设计封面',
        coverLogo: '/assets/huawei-cloud/campaign-cover-logo.svg',
        coverLogoAlt: '华为云活动页设计封面标志',
        caseStudy: {
          template: 'statement-gallery',
          eyebrow: 'WEB / Campaign Pages',
          image: '/assets/huawei-cloud/campaign-pages-collage.jpg',
          imageAlt: '华为云活动页设计合集',
          statement:
            '为 HUAWEI CLOUD 活动页建立更具节奏感的视觉入口。在大促、发布会和专题活动之间，组织首屏氛围、产品权益和转化模块，让高密度活动信息保持清晰、有力和统一。'
        }
      }
    ]
  },
  ai: {
    title: 'AI 项目与实验',
    kicker: 'AI',
    projects: [
      {
        id: 'ai-edm-editor',
        title: 'EDM Editor',
        year: '2026',
        type: 'AI 辅助工作流',
        summary: '把重复设计沉淀为受规则约束的 EDM 工作流，让运营自主编辑文字、价格与颜色，设计师专注于规范和建议。',
        color: '#101010',
        coverVariant: 'edm-editor',
        caseStudy: {
          template: 'edm-editor',
          intro: '把已有 EDM 模板转化为受设计规范约束的运营工具：减少设计师重复工作，把文字、价格与颜色的调整交给运营，同时保留必要的品牌边界。',
          facts: [
            { key: 'brand', value: '个人项目' },
            { key: 'status', value: '已开源' },
            { key: 'role', value: '产品、设计、开发' },
            { key: 'scope', value: '构思、交互、视觉、落地' }
          ],
          statement: '颜色同样开放给运营编辑，但系统提供品牌建议与安全范围。设计师负责提出方向，不再逐项替运营做决定，减少来回修改，也避免双方因主观审美产生冲撞。',
          background: {
            title: '让设计师管规则，让运营管变化',
            body: '这个工具并不是让运营自由做设计，而是重新分配双方的工作：设计师把版式、层级与品牌判断固化为规则，运营在规则内完成高频内容调整，减少等待、核对与审美拉扯。',
            pains: [
              ['减少设计工作量', '把相同版式下的替图、改字、调价格等重复劳动从设计排期中移出，让设计师专注新模板与关键视觉判断。'],
              ['约束运营制图规范', '版式、字号、间距、图片比例与导出边界由模板锁定；运营拥有组合能力，但不能突破品牌和可用性底线。'],
              ['内容由运营直接负责', '文字与价格交给最了解活动信息的运营自行编辑，避免设计师代录后再经历逐字、逐价核对和反复修改。']
            ]
          },
          decisions: [
            ['01 / LESS REPETITION', '把重复制作变成模板组合', 'Logo、导航、Banner、标题、卖点、商品卡与页尾以楼层复用，设计师不再为同一版式重复排期和切图。'],
            ['02 / RULED FREEDOM', '运营能做图，但不能破坏规范', '布局、字号、间距、图片比例和导出边界由模板约束；运营只在安全范围内组合内容。'],
            ['03 / CONTENT OWNERSHIP', '文字和价格由运营直接编辑', '运营可以修改文案、按钮与价格，也可从 Shopify 链接同步商品信息，省去设计师代录与双方反复核对。'],
            ['04 / COLOR COLLABORATION', '颜色交给运营，设计提供建议', '运营按活动需要调整背景与强调色；系统保留推荐色与品牌范围，让设计建议可被参考，而不是变成审美冲撞。']
          ],
          capabilities: [
            ['模板系统', '以注册表、字段 schema 和导出区域描述模板，新模板可以沿用同一编辑器与导出链路。'],
            ['EDM + GIF', '支持静态 EDM 楼层与 4 类 GIF 模板；GIF 作品可被 Banner 引用、同步和继续编辑。'],
            ['真实商品同步', '从 Shopify 链接读取商品标题、主图、图库与价格，保留运营对按钮文案和局部内容的控制。'],
            ['本地优先', '草稿与素材保存在本机，可打包为 macOS、Windows 桌面应用，降低内部数据外传与部署门槛。'],
            ['稳定导出', '处理图片裁切、拖动、缩放、半像素接缝、GIF 帧顺序与可点击热区，让预览和导出保持一致。'],
            ['可验证实现', '以 250 项自动测试覆盖编辑器、模板、商品同步、导出与服务层，并通过真实浏览器回归关键流程。']
          ],
          results: [
            ['−58%', '重复设计需求量', '试运行估算 · 待实际数据校准'],
            ['20 min', '标准 EDM 组合耗时', '原流程约 2–3 个工作日'],
            ['−45%', '交付往返次数', '文字、价格自助编辑与字段约束带来的估算'],
            ['250', '自动化测试', '覆盖编辑、模板、导出与服务层']
          ]
        }
      },
      {
        id: 'ai-material-collector',
        title: '谢小屯 — AI 素材采集器',
        year: '2026',
        type: 'AI 本地工作流',
        summary: '把网页中的图片、GIF 与视频一键收进本地素材库，并让标签随着人工纠正持续贴近个人习惯。',
        color: '#F3F3F0',
        coverVariant: 'material-collector',
        caseStudy: {
          template: 'material-collector',
          eyebrow: 'AI / Personal Tool',
          intro: '一个由浏览器采集扩展与 macOS 本地素材库组成的个人工具，让灵感从网页进入可浏览、可检索、会学习的本地工作流。',
          facts: [
            { key: 'brand', value: '个人项目' },
            { key: 'status', value: '本地工作流 / Chrome + macOS' },
            { key: 'role', value: '产品、设计、开发' },
            { key: 'scope', value: '构思、交互、视觉、落地' }
          ],
          background: {
            title: '设计背景',
            body: '花瓣承接了日常灵感收藏，却没有完全接上本地工作流；素材仍需手动下载、归档和补充标签，跨平台限制与重复整理不断打断设计过程。',
            pains: [
              ['跨平台采集受限', '不同网站的素材保存方式并不统一，部分页面还会限制直接采集。'],
              ['本地归档需要维护', '每次都要建立、命名并切换文件夹，浏览与整理被反复打断。'],
              ['分类与标签成本高', '素材保存后仍要手动判断归类、输入标签，数量越多，维护时间越高。']
            ]
          },
          principle: '把“采集—理解—纠正—再利用”收进本地，让素材不只被保存，也能在持续使用中理解我的判断，逐步长成贴近个人工作方式的素材系统。',
          flow: [
            ['01', '网页采集', '悬停素材出现圆形仓鼠按钮，不离开当前页面完成采集。', 'human'],
            ['02', '保存原文件', '扩展将图片、GIF 或视频写入本地素材目录，并保留来源。', 'system'],
            ['03', '素材理解', '本地模型生成内容与用途标签，同时记录格式、比例和颜色。', 'model'],
            ['04', '检索与复用', '我从素材库中选择真正有用的参考，让素材重新进入当前设计任务。', 'human', '我选择参与'],
            ['05', '偏好学习', '本地模型把我的选择、增删与否定记录整理为下一次判断的偏好上下文。', 'model']
          ],
          classification: {
            model: 'Qwen3-VL 2B · 4-bit',
            runtime: 'MLX 本地推理 / 图片缩放至 1600 × 2400 内 / 不上传云端',
            inputs: [
              ['01 / FILE', '文件基础信息', '文件名与宽高比先生成可确定的格式、版式和来源线索。'],
              ['02 / VISION', 'OCR 与布局预判', 'macOS Vision 识别文字、矩形结构、物体与人脸，为 UI 判断提供提示。'],
              ['03 / PREFERENCE', '个人偏好上下文', '人工新增标签进入常用词表；被删除标签被记录为需要更强证据的纠正项。']
            ],
            assetTypes: ['UI页面', 'UI组件', '平面设计', '摄影', '插画', '3D', 'GIF动效', '视频', '其他'],
            branches: [
              ['UI BRANCH', '界面标签分支', 'UI 置信度 ≥ 0.80', ['页面类型 ≤ 1', '组件 ≤ 5', '行业 ≤ 2', '视觉属性 ≤ 3']],
              ['GENERAL BRANCH', '通用素材分支', '未通过 UI 门槛', ['人物 / 产品', '摄影 / 插画', '包装 / 品牌', '动物 / 场景 ≤ 8']]
            ],
            merge: [
              ['规则标签', '文件名、尺寸与 Vision 产生的确定性标签。'],
              ['模型标签', '通过词表、数量与置信度门槛的语义标签。'],
              ['人工新增', '保留用户主动补充的用途和项目语言。'],
              ['人工删除', '从最终结果中排除，并进入后续纠正上下文。']
            ]
          },
          benchmark: {
            checkedAt: '公开能力核对 / 2026.08',
            title: '工具对比',
            body: '花瓣更像成熟的云端灵感平台，谢小屯更像贴身的本地工作台。花瓣把采集、画板、标签与同步组织成完整的灵感管理体系；谢小屯没有复刻这套平台能力，而是把采集动作做得更轻，再让本地模型接手整理。',
            rows: [
              {
                dimension: '采集方式',
                huaban: '采集体系更完整，素材需要先进入画板；若要形成可检索的秩序，还要继续手动维护标签、色板等维度，管理能力更强，但时间成本也更高。',
                materialCollector: '只保留悬停采集按钮，原文件与来源先进入本地；分类、用途标签和属性识别由本地模型异步完成，更纯粹，也不会中断浏览。',
                huabanBadge: '更完整',
                materialCollectorBadge: '更纯粹'
              },
              {
                dimension: '素材归属',
                huaban: '默认进入账号与云端画板；本地同步、离线浏览位于 Pro 客户端体系。',
                materialCollector: '原文件直接进入用户指定文件夹，Finder 与其他软件可以继续使用。',
                winner: 'materialCollector'
              },
              {
                dimension: '整理与规模',
                huaban: '画板、标签、色板、搜索与千万级图片管理，适合大型灵感库。',
                materialCollector: '只保留个人高频的搜索、类型与用途标签，界面更轻、更少维护。',
                winner: 'huaban'
              },
              {
                dimension: '个性化判断',
                huaban: '公开能力更侧重通用分类、搜索与跨设备管理。',
                materialCollector: '记录新增与否定标签，让后续判断持续贴近个人工作语言。',
                winner: 'materialCollector'
              },
              {
                dimension: '协作与同步',
                huaban: '云端同步、多设备访问与分享链路更成熟，现阶段更适合跨设备管理。',
                materialCollector: '当前仍是单人本地工具；后续可从共享素材包、用户自选同步源和团队标签词典开始扩展，而不改变本地优先原则。',
                huabanBadge: '当前更成熟',
                materialCollectorBadge: '可扩展路线'
              }
            ],
            extensions: [
              ['01 / 可迁移', '共享素材包', '将选中的原文件、来源、标签与项目结构一起导出和导入，先解决低成本交接。'],
              ['02 / 跨设备', '用户自选同步源', '支持 iCloud、NAS 或 WebDAV 等用户已有存储，只同步文件与元数据，不绑定新的内容云。'],
              ['03 / 团队化', '共享标签词典', '团队共享项目术语、用途标签和命名规则；个人新增与否定偏好仍保留在自己的设备上。'],
              ['04 / 功能扩展', '临时项目组', '围绕当前项目临时归集所需素材与参考，集中查看与调用；项目结束后可解散项目组，素材仍保留在个人素材库中。']
            ],
            advantages: [
              ['原始大图直接进入素材库', '列表页即可解析卡片对应的大图，不必进入详情页或从平台二次下载。'],
              ['标签会学习个人偏好', '用户的补充与否定不是一次性编辑，而是下一次判断的依据。'],
              ['只展示真正有用的信息', '用途与具体模块优先；格式、颜色、比例退到后台，减少标签噪音。'],
              ['围绕自己的工作流定制', '高频网站保留专项解析，同时兼容普通网页和本地 Finder 流程。']
            ]
          }
        }
      },
      {
        id: 'ai-product-assets-locator',
        title: '产品素材快速定位工具',
        year: '2026',
        type: 'AI 辅助工作流',
        summary: '为运营、设计、摄影团队设计的内部插件，帮助同事从产品页快速找到 SPU 与 NAS 素材。',
        color: '#FFAC33',
        coverVariant: 'asset-locator',
        caseStudy: {
          eyebrow: 'AI / Internal Tool',
          facts: [
            { key: 'brand', value: '个人项目' },
            {
              key: 'status',
              value: '已开源',
              linkLabel: 'github.com/xiemingjian2024-stack/...',
              href: 'https://github.com/xiemingjian2024-stack/funnyfuzzy-product-assets-extension'
            },
            { key: 'role', value: '1人 / 产品、设计、开发' },
            { key: 'scope', value: '产品、运营、设计、摄影' }
          ],
          intro:
            '为运营、设计、摄影团队设计的内部插件，帮助同事从产品页快速找到 SPU 与 NAS 素材。',
          sections: [
            {
              label: '01 / 起因',
              eyebrow: '原始需求',
              title: '产品页中加入一串 SPU 编号',
              body:
                '运营、设计、摄影同事查找素材时，只能复制产品名搜索或询问负责人；最初的解决思路是在产品页加一个内部可复制的 SPU。',
              points: [
                '便于内部同事用 SPU 搜索 NAS 素材',
                '不影响用户侧的信息获取',
                '建议放在标题尾部或折叠信息中'
              ]
            },
            {
              label: '02 / 判断',
              eyebrow: '需求判断',
              title: '把“加字段”推进为仅内部可见的插件',
              body:
                'SPU 是内部效率信息，不适合暴露在用户页面里。我用 Codex 协助拆解识别、查询和维护链路，把需求改成右下角内部插件。',
              points: [
                '识别当前产品页并匹配飞书绑定表',
                '在插件内完成 SPU、NAS 和资源表跳转',
                '让内部效率能力与用户界面解耦'
              ]
            },
            {
              label: '03 / 方案',
              title: '方案',
              body:
                '从产品页到素材库的最短路径：插件识别当前产品页后，通过内部查询服务匹配飞书绑定表，自动带回对应的 NAS 素材、SPU 信息和维护入口。\n\n我把操作集中在产品页右下角的可折叠面板里，让同事不需要离开当前商品，就能完成查看 SPU、打开 NAS 素材、跳转资源表和反馈异常。'
            },
            {
              label: '04 / AI 与维护',
              title: '落地',
              body:
                '把 AI 用在信息关系、异常说明和后续维护上，最终落到真实产品页。AI 辅助梳理多角色查找路径、字段映射、异常状态文案和维护说明；最终把面板固定在产品页右下角，提供 NAS 素材、SPU 复制、查看 SPU 和异常反馈入口。'
            }
          ]
        }
      }
    ]
  }
};

function sortPortfolioSectionsByYear(sections) {
  const getNewestYear = (year) => {
    const years = String(year).match(/\d{4}/g)?.map(Number) ?? [];
    return years.length ? Math.max(...years) : 0;
  };

  return Object.fromEntries(
    Object.entries(sections).map(([sectionKey, section]) => [
      sectionKey,
      {
        ...section,
        projects: [...section.projects].sort((firstProject, secondProject) => (
          getNewestYear(secondProject.year) - getNewestYear(firstProject.year)
        ))
      }
    ])
  );
}

const rawPhotographyItems = [
  {
    id: 'photo-001',
    src: '/assets/photography/optimized/huaban-77551582-001-5004284533.jpg',
    originalSrc: '/assets/photography/huaban-77551582-001-5004284533.jpg',
    alt: '摄影作品 001',
    aspectRatio: '5304 / 7952'
  },
  {
    id: 'photo-002',
    src: '/assets/photography/optimized/huaban-77551582-002-5004284280.jpg',
    originalSrc: '/assets/photography/huaban-77551582-002-5004284280.jpg',
    alt: '摄影作品 002',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-003',
    src: '/assets/photography/optimized/huaban-77551582-003-5004284056.jpg',
    originalSrc: '/assets/photography/huaban-77551582-003-5004284056.jpg',
    alt: '摄影作品 003',
    aspectRatio: '6757 / 4507'
  },
  {
    id: 'photo-004',
    src: '/assets/photography/optimized/huaban-77551582-004-5004283865.jpg',
    originalSrc: '/assets/photography/huaban-77551582-004-5004283865.jpg',
    alt: '摄影作品 004',
    aspectRatio: '5749 / 3835'
  },
  {
    id: 'photo-005',
    src: '/assets/photography/optimized/huaban-77551582-005-5004283642.jpg',
    originalSrc: '/assets/photography/huaban-77551582-005-5004283642.jpg',
    alt: '摄影作品 005',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-006',
    src: '/assets/photography/optimized/huaban-77551582-006-5004283433.jpg',
    originalSrc: '/assets/photography/huaban-77551582-006-5004283433.jpg',
    alt: '摄影作品 006',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-007',
    src: '/assets/photography/optimized/huaban-77551582-007-5004283187.jpg',
    originalSrc: '/assets/photography/huaban-77551582-007-5004283187.jpg',
    alt: '摄影作品 007',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-008',
    src: '/assets/photography/optimized/huaban-77551582-008-5004282977.jpg',
    originalSrc: '/assets/photography/huaban-77551582-008-5004282977.jpg',
    alt: '摄影作品 008',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-009',
    src: '/assets/photography/optimized/huaban-77551582-009-5004282768.jpg',
    originalSrc: '/assets/photography/huaban-77551582-009-5004282768.jpg',
    alt: '摄影作品 009',
    aspectRatio: '5911 / 3942'
  },
  {
    id: 'photo-010',
    src: '/assets/photography/optimized/huaban-77551582-010-5004282531.jpg',
    originalSrc: '/assets/photography/huaban-77551582-010-5004282531.jpg',
    alt: '摄影作品 010',
    aspectRatio: '5304 / 7952'
  },
  {
    id: 'photo-011',
    src: '/assets/photography/optimized/huaban-77551582-011-5004282277.jpg',
    originalSrc: '/assets/photography/huaban-77551582-011-5004282277.jpg',
    alt: '摄影作品 011',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-012',
    src: '/assets/photography/optimized/huaban-77551582-012-5004282003.jpg',
    originalSrc: '/assets/photography/huaban-77551582-012-5004282003.jpg',
    alt: '摄影作品 012',
    aspectRatio: '7952 / 5304'
  },
  {
    id: 'photo-013',
    src: '/assets/photography/optimized/huaban-77551582-013-5004281736.jpg',
    originalSrc: '/assets/photography/huaban-77551582-013-5004281736.jpg',
    alt: '摄影作品 013',
    aspectRatio: '7366 / 4913'
  },
  {
    id: 'photo-014',
    src: '/assets/photography/optimized/huaban-77551582-014-5004281531.jpg',
    originalSrc: '/assets/photography/huaban-77551582-014-5004281531.jpg',
    alt: '摄影作品 014',
    aspectRatio: '4420 / 6627'
  },
  {
    id: 'photo-015',
    src: '/assets/photography/optimized/huaban-77551582-015-5004281358.jpg',
    originalSrc: '/assets/photography/huaban-77551582-015-5004281358.jpg',
    alt: '摄影作品 015',
    aspectRatio: '5304 / 7952'
  },
  {
    id: 'photo-016',
    src: '/assets/photography/optimized/huaban-77551582-016-5004281087.jpg',
    originalSrc: '/assets/photography/huaban-77551582-016-5004281087.jpg',
    alt: '摄影作品 016',
    aspectRatio: '3000 / 4000'
  },
  {
    id: 'photo-017',
    src: '/assets/photography/optimized/huaban-77551582-017-5004280934.jpg',
    originalSrc: '/assets/photography/huaban-77551582-017-5004280934.jpg',
    alt: '摄影作品 017',
    aspectRatio: '3000 / 4000'
  },
  {
    id: 'photo-018',
    src: '/assets/photography/optimized/huaban-77551582-018-5004280806.jpg',
    originalSrc: '/assets/photography/huaban-77551582-018-5004280806.jpg',
    alt: '摄影作品 018',
    aspectRatio: '2250 / 4000'
  },
  {
    id: 'photo-019',
    src: '/assets/photography/optimized/huaban-77551582-019-5004280714.jpg',
    originalSrc: '/assets/photography/huaban-77551582-019-5004280714.jpg',
    alt: '摄影作品 019',
    aspectRatio: '6016 / 3700'
  },
  {
    id: 'photo-020',
    src: '/assets/photography/optimized/huaban-77551582-020-5004280486.jpg',
    originalSrc: '/assets/photography/huaban-77551582-020-5004280486.jpg',
    alt: '摄影作品 020',
    aspectRatio: '2799 / 4854'
  },
  {
    id: 'photo-021',
    src: '/assets/photography/optimized/huaban-77551582-021-5004280359.jpg',
    originalSrc: '/assets/photography/huaban-77551582-021-5004280359.jpg',
    alt: '摄影作品 021',
    aspectRatio: '3834 / 5766'
  },
  {
    id: 'photo-022',
    src: '/assets/photography/optimized/huaban-77551582-022-5004280127.jpg',
    originalSrc: '/assets/photography/huaban-77551582-022-5004280127.jpg',
    alt: '摄影作品 022',
    aspectRatio: '3157 / 5418'
  },
  {
    id: 'photo-023',
    src: '/assets/photography/optimized/huaban-77551582-023-5004279913.jpg',
    originalSrc: '/assets/photography/huaban-77551582-023-5004279913.jpg',
    alt: '摄影作品 023',
    aspectRatio: '3693 / 5555'
  },
  {
    id: 'photo-024',
    src: '/assets/photography/optimized/huaban-77551582-024-5004279769.jpg',
    originalSrc: '/assets/photography/huaban-77551582-024-5004279769.jpg',
    alt: '摄影作品 024',
    aspectRatio: '6016 / 4000'
  },
  {
    id: 'photo-025',
    src: '/assets/photography/optimized/huaban-77551582-025-5004279533.jpg',
    originalSrc: '/assets/photography/huaban-77551582-025-5004279533.jpg',
    alt: '摄影作品 025',
    aspectRatio: '2972 / 3264'
  },
  {
    id: 'photo-026',
    src: '/assets/photography/optimized/huaban-77551582-026-5004279400.jpg',
    originalSrc: '/assets/photography/huaban-77551582-026-5004279400.jpg',
    alt: '摄影作品 026',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-027',
    src: '/assets/photography/optimized/huaban-77551582-027-5004279053.jpg',
    originalSrc: '/assets/photography/huaban-77551582-027-5004279053.jpg',
    alt: '摄影作品 027',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-028',
    src: '/assets/photography/optimized/huaban-77551582-028-5004278668.jpg',
    originalSrc: '/assets/photography/huaban-77551582-028-5004278668.jpg',
    alt: '摄影作品 028',
    aspectRatio: '7952 / 4473'
  },
  {
    id: 'photo-029',
    src: '/assets/photography/optimized/huaban-77551582-029-5004278500.jpg',
    originalSrc: '/assets/photography/huaban-77551582-029-5004278500.jpg',
    alt: '摄影作品 029',
    aspectRatio: '4323 / 7685'
  },
  {
    id: 'photo-030',
    src: '/assets/photography/optimized/huaban-77551582-030-5004278267.jpg',
    originalSrc: '/assets/photography/huaban-77551582-030-5004278267.jpg',
    alt: '摄影作品 030',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-031',
    src: '/assets/photography/optimized/huaban-77551582-031-5004277881.jpg',
    originalSrc: '/assets/photography/huaban-77551582-031-5004277881.jpg',
    alt: '摄影作品 031',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-032',
    src: '/assets/photography/optimized/huaban-77551582-032-5004277711.jpg',
    originalSrc: '/assets/photography/huaban-77551582-032-5004277711.jpg',
    alt: '摄影作品 032',
    aspectRatio: '7630 / 4292'
  },
  {
    id: 'photo-033',
    src: '/assets/photography/optimized/huaban-77551582-033-5004277598.jpg',
    originalSrc: '/assets/photography/huaban-77551582-033-5004277598.jpg',
    alt: '摄影作品 033',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-034',
    src: '/assets/photography/optimized/huaban-77551582-034-5004277377.jpg',
    originalSrc: '/assets/photography/huaban-77551582-034-5004277377.jpg',
    alt: '摄影作品 034',
    aspectRatio: '1580 / 2800'
  },
  {
    id: 'photo-035',
    src: '/assets/photography/optimized/huaban-77551582-035-5004277324.jpg',
    originalSrc: '/assets/photography/huaban-77551582-035-5004277324.jpg',
    alt: '摄影作品 035',
    aspectRatio: '1574 / 2800'
  },
  {
    id: 'photo-036',
    src: '/assets/photography/optimized/huaban-77551582-036-5004277249.jpg',
    originalSrc: '/assets/photography/huaban-77551582-036-5004277249.jpg',
    alt: '摄影作品 036',
    aspectRatio: '1868 / 2800'
  },
  {
    id: 'photo-037',
    src: '/assets/photography/optimized/huaban-77551582-037-5004277201.jpg',
    originalSrc: '/assets/photography/huaban-77551582-037-5004277201.jpg',
    alt: '摄影作品 037',
    aspectRatio: '2800 / 1574'
  },
  {
    id: 'photo-038',
    src: '/assets/photography/optimized/huaban-77551582-038-5004277116.jpg',
    originalSrc: '/assets/photography/huaban-77551582-038-5004277116.jpg',
    alt: '摄影作品 038',
    aspectRatio: '4936 / 7952'
  },
  {
    id: 'photo-039',
    src: '/assets/photography/optimized/huaban-77551582-039-5004276846.jpg',
    originalSrc: '/assets/photography/huaban-77551582-039-5004276846.jpg',
    alt: '摄影作品 039',
    aspectRatio: '5304 / 7952'
  },
  {
    id: 'photo-040',
    src: '/assets/photography/optimized/huaban-77551582-040-5004276587.jpg',
    originalSrc: '/assets/photography/huaban-77551582-040-5004276587.jpg',
    alt: '摄影作品 040',
    aspectRatio: '7952 / 4920'
  },
  {
    id: 'photo-041',
    src: '/assets/photography/optimized/huaban-77551582-041-5004276350.jpg',
    originalSrc: '/assets/photography/huaban-77551582-041-5004276350.jpg',
    alt: '摄影作品 041',
    aspectRatio: '5304 / 7952'
  },
  {
    id: 'photo-042',
    src: '/assets/photography/optimized/huaban-77551582-042-4620011727.jpg',
    originalSrc: '/assets/photography/huaban-77551582-042-4620011727.jpg',
    alt: '摄影作品 042',
    aspectRatio: '5018 / 7524'
  },
  {
    id: 'photo-043',
    src: '/assets/photography/optimized/huaban-77551582-043-4620011385.jpg',
    originalSrc: '/assets/photography/huaban-77551582-043-4620011385.jpg',
    alt: '摄影作品 043',
    aspectRatio: '5090 / 7631'
  },
  {
    id: 'photo-044',
    src: '/assets/photography/optimized/huaban-77551582-044-4620011284.jpg',
    originalSrc: '/assets/photography/huaban-77551582-044-4620011284.jpg',
    alt: '摄影作品 044',
    aspectRatio: '5064 / 7568'
  },
  {
    id: 'photo-045',
    src: '/assets/photography/optimized/huaban-77551582-045-4620011200.jpg',
    originalSrc: '/assets/photography/huaban-77551582-045-4620011200.jpg',
    alt: '摄影作品 045',
    aspectRatio: '4305 / 6455'
  },
  {
    id: 'photo-046',
    src: '/assets/photography/optimized/huaban-77551582-046-4620011027.jpg',
    originalSrc: '/assets/photography/huaban-77551582-046-4620011027.jpg',
    alt: '摄影作品 046',
    aspectRatio: '1920 / 1080'
  },
  {
    id: 'photo-047',
    src: '/assets/photography/optimized/huaban-77551582-047-4620010986.jpg',
    originalSrc: '/assets/photography/huaban-77551582-047-4620010986.jpg',
    alt: '摄影作品 047',
    aspectRatio: '2275 / 3605'
  },
  {
    id: 'photo-048',
    src: '/assets/photography/optimized/huaban-77551582-048-4620010887.jpg',
    originalSrc: '/assets/photography/huaban-77551582-048-4620010887.jpg',
    alt: '摄影作品 048',
    aspectRatio: '3060 / 3605'
  },
  {
    id: 'photo-049',
    src: '/assets/photography/optimized/huaban-77551582-049-4620010861.jpg',
    originalSrc: '/assets/photography/huaban-77551582-049-4620010861.jpg',
    alt: '摄影作品 049',
    aspectRatio: '2028 / 3605'
  },
  {
    id: 'photo-050',
    src: '/assets/photography/optimized/huaban-77551582-050-4620010825.jpg',
    originalSrc: '/assets/photography/huaban-77551582-050-4620010825.jpg',
    alt: '摄影作品 050',
    aspectRatio: '2704 / 3605'
  },
  {
    id: 'photo-051',
    src: '/assets/photography/optimized/huaban-77551582-051-4620010786.jpg',
    originalSrc: '/assets/photography/huaban-77551582-051-4620010786.jpg',
    alt: '摄影作品 051',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-052',
    src: '/assets/photography/optimized/huaban-77551582-052-4620010620.jpg',
    originalSrc: '/assets/photography/huaban-77551582-052-4620010620.jpg',
    alt: '摄影作品 052',
    aspectRatio: '6416 / 3608'
  },
  {
    id: 'photo-053',
    src: '/assets/photography/optimized/huaban-77551582-053-4620010581.jpg',
    originalSrc: '/assets/photography/huaban-77551582-053-4620010581.jpg',
    alt: '摄影作品 053',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-054',
    src: '/assets/photography/optimized/huaban-77551582-054-4620010521.jpg',
    originalSrc: '/assets/photography/huaban-77551582-054-4620010521.jpg',
    alt: '摄影作品 054',
    aspectRatio: '6404 / 3601'
  },
  {
    id: 'photo-055',
    src: '/assets/photography/optimized/huaban-77551582-055-4620010448.jpg',
    originalSrc: '/assets/photography/huaban-77551582-055-4620010448.jpg',
    alt: '摄影作品 055',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-056',
    src: '/assets/photography/optimized/huaban-77551582-056-4620010335.jpg',
    originalSrc: '/assets/photography/huaban-77551582-056-4620010335.jpg',
    alt: '摄影作品 056',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-057',
    src: '/assets/photography/optimized/huaban-77551582-057-4620010230.jpg',
    originalSrc: '/assets/photography/huaban-77551582-057-4620010230.jpg',
    alt: '摄影作品 057',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-058',
    src: '/assets/photography/optimized/huaban-77551582-058-4620010122.jpg',
    originalSrc: '/assets/photography/huaban-77551582-058-4620010122.jpg',
    alt: '摄影作品 058',
    aspectRatio: '7952 / 4472'
  },
  {
    id: 'photo-059',
    src: '/assets/photography/optimized/huaban-77551582-059-4620001780.jpg',
    originalSrc: '/assets/photography/huaban-77551582-059-4620001780.jpg',
    alt: '摄影作品 059',
    aspectRatio: '2731 / 4096'
  },
  {
    id: 'photo-060',
    src: '/assets/photography/optimized/huaban-77551582-060-4620001730.jpg',
    originalSrc: '/assets/photography/huaban-77551582-060-4620001730.jpg',
    alt: '摄影作品 060',
    aspectRatio: '2732 / 4096'
  },
  {
    id: 'photo-061',
    src: '/assets/photography/optimized/huaban-77551582-061-4620001683.jpg',
    originalSrc: '/assets/photography/huaban-77551582-061-4620001683.jpg',
    alt: '摄影作品 061',
    aspectRatio: '4096 / 2731'
  },
  {
    id: 'photo-062',
    src: '/assets/photography/optimized/huaban-77551582-062-4620001647.jpg',
    originalSrc: '/assets/photography/huaban-77551582-062-4620001647.jpg',
    alt: '摄影作品 062',
    aspectRatio: '4096 / 2732'
  },
  {
    id: 'photo-063',
    src: '/assets/photography/optimized/huaban-77551582-063-4620001598.jpg',
    originalSrc: '/assets/photography/huaban-77551582-063-4620001598.jpg',
    alt: '摄影作品 063',
    aspectRatio: '2731 / 4096'
  },
  {
    id: 'photo-064',
    src: '/assets/photography/optimized/huaban-77551582-064-4620001546.jpg',
    originalSrc: '/assets/photography/huaban-77551582-064-4620001546.jpg',
    alt: '摄影作品 064',
    aspectRatio: '2732 / 4096'
  },
  {
    id: 'photo-065',
    src: '/assets/photography/optimized/huaban-77551582-065-4620001360.jpg',
    originalSrc: '/assets/photography/huaban-77551582-065-4620001360.jpg',
    alt: '摄影作品 065',
    aspectRatio: '2731 / 4096'
  },
  {
    id: 'photo-066',
    src: '/assets/photography/optimized/huaban-77551582-066-4620001286.jpg',
    originalSrc: '/assets/photography/huaban-77551582-066-4620001286.jpg',
    alt: '摄影作品 066',
    aspectRatio: '2732 / 4096'
  },
  {
    id: 'photo-067',
    src: '/assets/photography/optimized/huaban-77551582-067-4620001229.jpg',
    originalSrc: '/assets/photography/huaban-77551582-067-4620001229.jpg',
    alt: '摄影作品 067',
    aspectRatio: '2731 / 4096'
  },
  {
    id: 'photo-068',
    src: '/assets/photography/optimized/huaban-77551582-068-4620001129.jpg',
    originalSrc: '/assets/photography/huaban-77551582-068-4620001129.jpg',
    alt: '摄影作品 068',
    aspectRatio: '2732 / 4096'
  },
  {
    id: 'photo-069',
    src: '/assets/photography/optimized/huaban-77551582-069-4620001090.jpg',
    originalSrc: '/assets/photography/huaban-77551582-069-4620001090.jpg',
    alt: '摄影作品 069',
    aspectRatio: '2732 / 4096'
  },
  {
    id: 'photo-070',
    src: '/assets/photography/optimized/huaban-77551582-070-4620001025.jpg',
    originalSrc: '/assets/photography/huaban-77551582-070-4620001025.jpg',
    alt: '摄影作品 070',
    aspectRatio: '4096 / 2732'
  },
  {
    id: 'photo-071',
    src: '/assets/photography/optimized/huaban-77551582-071-4620000990.jpg',
    originalSrc: '/assets/photography/huaban-77551582-071-4620000990.jpg',
    alt: '摄影作品 071',
    aspectRatio: '4096 / 2732'
  },
  {
    id: 'photo-072',
    src: '/assets/photography/optimized/huaban-77551582-072-4620000955.jpg',
    originalSrc: '/assets/photography/huaban-77551582-072-4620000955.jpg',
    alt: '摄影作品 072',
    aspectRatio: '1614 / 1076'
  },
  {
    id: 'photo-073',
    src: '/assets/photography/optimized/huaban-77551582-073-4620000939.jpg',
    originalSrc: '/assets/photography/huaban-77551582-073-4620000939.jpg',
    alt: '摄影作品 073',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-074',
    src: '/assets/photography/optimized/huaban-77551582-074-4620000906.jpg',
    originalSrc: '/assets/photography/huaban-77551582-074-4620000906.jpg',
    alt: '摄影作品 074',
    aspectRatio: '1616 / 1080'
  },
  {
    id: 'photo-075',
    src: '/assets/photography/optimized/huaban-77551582-075-4620000883.jpg',
    originalSrc: '/assets/photography/huaban-77551582-075-4620000883.jpg',
    alt: '摄影作品 075',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-076',
    src: '/assets/photography/optimized/huaban-77551582-076-4620000861.jpg',
    originalSrc: '/assets/photography/huaban-77551582-076-4620000861.jpg',
    alt: '摄影作品 076',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-077',
    src: '/assets/photography/optimized/huaban-77551582-077-4620000838.jpg',
    originalSrc: '/assets/photography/huaban-77551582-077-4620000838.jpg',
    alt: '摄影作品 077',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-078',
    src: '/assets/photography/optimized/huaban-77551582-078-4620000822.jpg',
    originalSrc: '/assets/photography/huaban-77551582-078-4620000822.jpg',
    alt: '摄影作品 078',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-079',
    src: '/assets/photography/optimized/huaban-77551582-079-4620000805.jpg',
    originalSrc: '/assets/photography/huaban-77551582-079-4620000805.jpg',
    alt: '摄影作品 079',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-080',
    src: '/assets/photography/optimized/huaban-77551582-080-4620000780.jpg',
    originalSrc: '/assets/photography/huaban-77551582-080-4620000780.jpg',
    alt: '摄影作品 080',
    aspectRatio: '1080 / 1616'
  },
  {
    id: 'photo-081',
    src: '/assets/photography/optimized/huaban-77551582-081-4620000743.jpg',
    originalSrc: '/assets/photography/huaban-77551582-081-4620000743.jpg',
    alt: '摄影作品 081',
    aspectRatio: '1616 / 1080'
  },
  {
    id: 'photo-082',
    src: '/assets/photography/optimized/huaban-77551582-082-4620000007.jpg',
    originalSrc: '/assets/photography/huaban-77551582-082-4620000007.jpg',
    alt: '摄影作品 082',
    aspectRatio: '1716 / 2576'
  },
  {
    id: 'photo-083',
    src: '/assets/photography/optimized/huaban-77551582-083-4619999975.jpg',
    originalSrc: '/assets/photography/huaban-77551582-083-4619999975.jpg',
    alt: '摄影作品 083',
    aspectRatio: '3605 / 3605'
  },
  {
    id: 'photo-084',
    src: '/assets/photography/optimized/huaban-77551582-084-4619999882.jpg',
    originalSrc: '/assets/photography/huaban-77551582-084-4619999882.jpg',
    alt: '摄影作品 084',
    aspectRatio: '3605 / 3605'
  },
  {
    id: 'photo-085',
    src: '/assets/photography/optimized/huaban-77551582-085-4619999818.jpg',
    originalSrc: '/assets/photography/huaban-77551582-085-4619999818.jpg',
    alt: '摄影作品 085',
    aspectRatio: '3276 / 3605'
  },
  {
    id: 'photo-086',
    src: '/assets/photography/optimized/huaban-77551582-086-4619999768.jpg',
    originalSrc: '/assets/photography/huaban-77551582-086-4619999768.jpg',
    alt: '摄影作品 086',
    aspectRatio: '3276 / 3605'
  },
  {
    id: 'photo-087',
    src: '/assets/photography/optimized/huaban-77551582-087-4619999173.jpg',
    originalSrc: '/assets/photography/huaban-77551582-087-4619999173.jpg',
    alt: '摄影作品 087',
    aspectRatio: '4489 / 7952'
  },
  {
    id: 'photo-088',
    src: '/assets/photography/optimized/huaban-77551582-088-4619999086.jpg',
    originalSrc: '/assets/photography/huaban-77551582-088-4619999086.jpg',
    alt: '摄影作品 088',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-089',
    src: '/assets/photography/optimized/huaban-77551582-089-4619998967.jpg',
    originalSrc: '/assets/photography/huaban-77551582-089-4619998967.jpg',
    alt: '摄影作品 089',
    aspectRatio: '7952 / 4473'
  },
  {
    id: 'photo-090',
    src: '/assets/photography/optimized/huaban-77551582-090-4619998365.jpg',
    originalSrc: '/assets/photography/huaban-77551582-090-4619998365.jpg',
    alt: '摄影作品 090',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-091',
    src: '/assets/photography/optimized/huaban-77551582-091-4619998322.jpg',
    originalSrc: '/assets/photography/huaban-77551582-091-4619998322.jpg',
    alt: '摄影作品 091',
    aspectRatio: '2268 / 4032'
  },
  {
    id: 'photo-092',
    src: '/assets/photography/optimized/huaban-77551582-092-4619998284.jpg',
    originalSrc: '/assets/photography/huaban-77551582-092-4619998284.jpg',
    alt: '摄影作品 092',
    aspectRatio: '4473 / 7952'
  },
  {
    id: 'photo-093',
    src: '/assets/photography/optimized/huaban-77551582-093-4619998208.jpg',
    originalSrc: '/assets/photography/huaban-77551582-093-4619998208.jpg',
    alt: '摄影作品 093',
    aspectRatio: '3264 / 3264'
  },
  {
    id: 'photo-094',
    src: '/assets/photography/optimized/huaban-77551582-094-4619997641.jpg',
    originalSrc: '/assets/photography/huaban-77551582-094-4619997641.jpg',
    alt: '摄影作品 094',
    aspectRatio: '4512 / 2787'
  },
  {
    id: 'photo-095',
    src: '/assets/photography/optimized/huaban-77551582-095-4619997590.jpg',
    originalSrc: '/assets/photography/huaban-77551582-095-4619997590.jpg',
    alt: '摄影作品 095',
    aspectRatio: '2811 / 3264'
  },
  {
    id: 'photo-096',
    src: '/assets/photography/optimized/huaban-77551582-096-4619997515.jpg',
    originalSrc: '/assets/photography/huaban-77551582-096-4619997515.jpg',
    alt: '摄影作品 096',
    aspectRatio: '2278 / 3264'
  },
  {
    id: 'photo-097',
    src: '/assets/photography/optimized/huaban-77551582-097-4619997458.jpg',
    originalSrc: '/assets/photography/huaban-77551582-097-4619997458.jpg',
    alt: '摄影作品 097',
    aspectRatio: '2448 / 3264'
  },
  {
    id: 'photo-098',
    src: '/assets/photography/optimized/huaban-77551582-098-4619997359.jpg',
    originalSrc: '/assets/photography/huaban-77551582-098-4619997359.jpg',
    alt: '摄影作品 098',
    aspectRatio: '2840 / 3264'
  },
  {
    id: 'photo-099',
    src: '/assets/photography/optimized/huaban-77551582-099-4619997292.jpg',
    originalSrc: '/assets/photography/huaban-77551582-099-4619997292.jpg',
    alt: '摄影作品 099',
    aspectRatio: '2840 / 3264'
  },
  {
    id: 'photo-100',
    src: '/assets/photography/optimized/huaban-77551582-100-4619996686.jpg',
    originalSrc: '/assets/photography/huaban-77551582-100-4619996686.jpg',
    alt: '摄影作品 100',
    aspectRatio: '3000 / 1995'
  },
  {
    id: 'photo-101',
    src: '/assets/photography/optimized/huaban-77551582-101-4619996657.jpg',
    originalSrc: '/assets/photography/huaban-77551582-101-4619996657.jpg',
    alt: '摄影作品 101',
    aspectRatio: '2000 / 3008'
  },
  {
    id: 'photo-102',
    src: '/assets/photography/optimized/huaban-77551582-102-4619996614.jpg',
    originalSrc: '/assets/photography/huaban-77551582-102-4619996614.jpg',
    alt: '摄影作品 102',
    aspectRatio: '2000 / 3008'
  },
  {
    id: 'photo-103',
    src: '/assets/photography/optimized/huaban-77551582-103-4619996574.jpg',
    originalSrc: '/assets/photography/huaban-77551582-103-4619996574.jpg',
    alt: '摄影作品 103',
    aspectRatio: '2000 / 3008'
  },
  {
    id: 'photo-104',
    src: '/assets/photography/optimized/huaban-77551582-104-4619996051.jpg',
    originalSrc: '/assets/photography/huaban-77551582-104-4619996051.jpg',
    alt: '摄影作品 104',
    aspectRatio: '2732 / 1536'
  },
  {
    id: 'photo-105',
    src: '/assets/photography/optimized/huaban-77551582-105-4619996021.jpg',
    originalSrc: '/assets/photography/huaban-77551582-105-4619996021.jpg',
    alt: '摄影作品 105',
    aspectRatio: '1536 / 2303'
  },
  {
    id: 'photo-106',
    src: '/assets/photography/optimized/huaban-77551582-106-4619996001.jpg',
    originalSrc: '/assets/photography/huaban-77551582-106-4619996001.jpg',
    alt: '摄影作品 106',
    aspectRatio: '2732 / 1537'
  },
  {
    id: 'photo-107',
    src: '/assets/photography/optimized/huaban-77551582-107-4619995979.jpg',
    originalSrc: '/assets/photography/huaban-77551582-107-4619995979.jpg',
    alt: '摄影作品 107',
    aspectRatio: '2732 / 1537'
  },
  {
    id: 'photo-108',
    src: '/assets/photography/optimized/huaban-77551582-108-4619995946.jpg',
    originalSrc: '/assets/photography/huaban-77551582-108-4619995946.jpg',
    alt: '摄影作品 108',
    aspectRatio: '2732 / 1536'
  },
  {
    id: 'photo-109',
    src: '/assets/photography/optimized/huaban-77551582-109-4619995935.jpg',
    originalSrc: '/assets/photography/huaban-77551582-109-4619995935.jpg',
    alt: '摄影作品 109',
    aspectRatio: '2732 / 1536'
  },
  {
    id: 'photo-110',
    src: '/assets/photography/optimized/huaban-77551582-110-4619995059.jpg',
    originalSrc: '/assets/photography/huaban-77551582-110-4619995059.jpg',
    alt: '摄影作品 110',
    aspectRatio: '1536 / 2422'
  },
  {
    id: 'photo-111',
    src: '/assets/photography/optimized/huaban-77551582-111-4619995024.jpg',
    originalSrc: '/assets/photography/huaban-77551582-111-4619995024.jpg',
    alt: '摄影作品 111',
    aspectRatio: '2437 / 1536'
  },
  {
    id: 'photo-112',
    src: '/assets/photography/optimized/huaban-77551582-112-4619995005.jpg',
    originalSrc: '/assets/photography/huaban-77551582-112-4619995005.jpg',
    alt: '摄影作品 112',
    aspectRatio: '1536 / 2303'
  },
  {
    id: 'photo-113',
    src: '/assets/photography/optimized/huaban-77551582-113-4619994990.jpg',
    originalSrc: '/assets/photography/huaban-77551582-113-4619994990.jpg',
    alt: '摄影作品 113',
    aspectRatio: '2492 / 1536'
  },
  {
    id: 'photo-114',
    src: '/assets/photography/optimized/huaban-77551582-114-4619994076.jpg',
    originalSrc: '/assets/photography/huaban-77551582-114-4619994076.jpg',
    alt: '摄影作品 114',
    aspectRatio: '1536 / 2305'
  },
  {
    id: 'photo-115',
    src: '/assets/photography/optimized/huaban-77551582-115-4619994028.jpg',
    originalSrc: '/assets/photography/huaban-77551582-115-4619994028.jpg',
    alt: '摄影作品 115',
    aspectRatio: '1536 / 2305'
  },
  {
    id: 'photo-116',
    src: '/assets/photography/optimized/huaban-77551582-116-4619993996.jpg',
    originalSrc: '/assets/photography/huaban-77551582-116-4619993996.jpg',
    alt: '摄影作品 116',
    aspectRatio: '1536 / 2305'
  },
  {
    id: 'photo-117',
    src: '/assets/photography/optimized/huaban-77551582-117-4619993965.jpg',
    originalSrc: '/assets/photography/huaban-77551582-117-4619993965.jpg',
    alt: '摄影作品 117',
    aspectRatio: '1536 / 2305'
  }
];

export const portfolioSections = withAssetBase(sortPortfolioSectionsByYear(rawPortfolioSections));
export const photographyItems = withAssetBase(rawPhotographyItems);

export function findProjectById(projectId) {
  return Object.entries(portfolioSections)
    .flatMap(([sectionKey, section]) => (
      section.projects.map((project) => ({ ...project, section: section.kicker, sectionKey }))
    ))
    .find((project) => project.id === projectId);
}

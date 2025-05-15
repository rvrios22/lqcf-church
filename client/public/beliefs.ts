const beliefs = [
  {
    title: "God",
    statement: "We believe in one God, creator of all things, seen and unseen. All things have been created by Him and for Him. Eternally existing in unity and purpose of three equally divine persons: the Father, the Son, and the Holy Spirit. Having limitless knowledge and sovereign in all things, including salvation, for His good pleasure, according to his will and for His purposes alone. God has graciously purposed from eternity to redeem a people for Himself, the Bride of Christ, and to make all things new for His own glory.",
    citations: "Genesis 1:1, Galatians 3:20, Colossians 1:16, Nehemiah 9:6, John 1:3, Titus 2:14, Romans 11:36, Revelation 4:11, Ephesians 1:3-5"
  },
  {
    title: "The Bible",
    statement: "We believe that God has spoken in the Scriptures, both Old and New Testaments, through the words of the divinely appointed human authors. God's word is without error and reveals the complete revelation of His will for salvation and the ultimate authority by which every realm of human knowledge and endeavor should be judged. Therefore, it is to be believed in all that it teaches, obeyed in all that it requires, and trusted in all that it promises.",
    citations: "2 Timothy 3:16-17, 2 Peter 1:20-21, 1 Thessalonians 2:13"
  },
  {
    title: "The Human Condition",
    statement: "We believe that God created males and females in His image but they sinned when tempted by Satan. In union with Adam, human beings are sinners by nature and by choice, alienated from God, dead in their trespasses and sin, children of wrath and under the wrath of God. Only through God's saving work in Jesus Christ can a person be rescued, reconciled, and renewed.",
    citations: "John 3:36, Romans 3:10-11, Ephesians 2:1-10, Romans 3:23, Romans 5:12, Titus 3:3"
  },
  {
    title: "Jesus Christ",
    statement: "We believe that Jesus Christ is God incarnate, fully God and fully man, One person in two natures. Jesus, Israel's promised Messiah, was conceived through the Holy Spirit and born of the virgin Mary. He lived a sinless life, was crucified under Pontius Pilate, arose from the dead, ascended into heaven, and sits at the right hand of God the Father as our High Priest and Advocate.",
    citations: "John 1:1-2, John 1:14, Philippians 2:5-8, Hebrews 1:1-4, 2 Corinthians 5:19-21, Luke 1:26-31, Hebrews 8:1-2, 1 Timothy 2:5, Galatians 4:4-5, Isaiah 7:14, Isaiah 9:6"
  },
  {
    title: "The Work of Christ",
    statement: "We believe that Jesus Christ, as our representative and substitute, shed His blood on the cross as the perfect, all-sufficient sacrifice for sin. He accomplished salvation and the work that the Father sent Him to do. His atoning death and vicarious resurrection constitute the only ground for salvation.",
    citations: "John 17:4, John 19:30, Acts 20:25, Acts 4:12, John 14:6, John 8:24, Romans 3:23-25, 2 Corinthians 5:25"
  },
  {
    title: "The Means of Salvation",
    statement: "We believe that salvation is the work of God. That salvation is by God's grace alone through faith alone and that these are gifts of God. Salvation is the result of God's unrestricted power, according to the purpose of His will, and to Him alone, belongs all the praise, honor, and glory.",
    citations: "Psalm 3:8, Ephesians 1:3-10, Ephesians 2:1-10, 1 Peter 1:3, John 1:13, Romans 9:16, John 3:5-6, John 6:44, John 6:63, John 10:26, Zechariah 4:6, Ezekiel 36:25-27, Mark 10:26-27, John 15:16, John 17:6-9, Romans 1:16, John 10:28, Romans 11:36"
  },
  {
    title: "The Holy Spirit",
    statement: "We believe that the Holy Spirit, in all that He does, glorifies the Lord Jesus Christ. He convicts the world regarding sin. He regenerates sinners, those who are otherwise dead in their sin by making them be born again and alive in Christ. In Him believers are baptized into union with Christ and adopted as heirs in the family of God. He also indwells, illuminates, guides, equips, and empowers His church for Christ-like living and service.",
    citations: "Ephesians 2:1-10, John 16:14, John 16:8, John 3:3, Titus 3:5, 1 Peter 1:3, Galatians 5:24-25, Galatians 5:16"
  },
  {
    title: "The Church",
    statement: "We believe that the true church comprises all who have been justified by God's grace through faith and that grace and faith are gifts of God. Believers are united by the Holy Spirit in the body of Christ, of which He is the head. The true church is manifest in local churches, whose membership should be comprised only of believers that are from every tribe, tongue, and nation.",
    citations: "Ephesians 4:4-6, Ephesians 2:8-10, Ephesians 5:23, Ephesians 1:22, Romans 5:1, 1 Corinthians 12:12-14, Acts 2:38-41"
  },
  {
    title: "The Sacraments",
    statement: "The Lord Jesus mandated two holy ordinances to be observed and administered until His return: baptism and the Lord's supper, which visibly and tangibly express the gospel. Though they are not the means of salvation, when celebrated by the church in genuine faith, these sacraments confirm and nourish the body of Christ, the Church, and are for believers only.",
    citations: "Matthew 28:19-20, I Corinthians 11:23-26, Luke 22:18-20, Mark 14:22-25, Acts 2:41-42"
  },
  {
    title: "Christian Living",
    statement: "We believe that God's justifying grace must not be separated from His sanctifying power and purpose. God commands us to love Him supremely and others sacrificially and to live out our faith with care for one another, compassion toward the poor, and justice for the oppressed. With God's word, the Spirit's power, and fervent prayer in Christ's name, we are to combat the spiritual forces of evil. In obedience to Christ's commission, we are to make disciples among all people, always bearing witness to the gospel in word and deed.",
    citations: "Luke 10:27, Matthew 25:39-40, Matthew 28:19-20, Ephesians 6:12, 1 Thessalonians 1:4-5, Philippians 2:12, Ephesians 4:32, James 1:22"
  },
  {
    title: "Christ's Return",
    statement: "We believe in the personal, bodily return of our Lord Jesus Christ. The coming of Christ, at a time known only to God, demands constant expectancy and, as our blessed hope, motivates the believer to godly living, sacrificial service, and energetic mission.",
    citations: "Titus 2:11-14, John 14:3, Acts 1:11, 1 Thessalonians 5:2, John 12:26, Matthew 16:27, Matthew 24:30, Revelation 1:7, Acts 11:8, 1 John 3:1-3, Revelation 19:11-16"
  },
  {
    title: "Response and Eternal Destiny",
    statement: "We believe that God commands everyone everywhere to repent and believe in the gospel, the sinless life, atoning death, and physical resurrection of the Lord Christ Jesus. We believe that God will raise the dead bodily and judge the world, assigning the unbeliever to condemnation and eternal conscious punishment and the believer to eternal life with the Lord Jesus. The Lord will create a new heaven and new earth, and believers, the Bride of Christ, will be with Him forever, to the praise of His glorious grace.",
    citations: "Matthew 4:17, Mark 1:15, Acts 17:30-31, 2 Timothy 4:1, Acts 10:42, Matthew 25:32-33, 1 Thessalonians 4:13-18, 1 Corinthians 15:51-57, Revelation 21:1, Revelation 20:11-15"
  },
  {
    title: "Preservation of the Saints",
    statement: "We believe that God saves His church unconditionally, by His grace, and therefore, it is God who keeps and preserves His church to endure until the end. We believe that the true church can never be cast out by their redeemer and that our salvation is secure in the Lord's hands.",
    citations: "Ephesians 2:8, 2 Timothy 4:18, Hebrews 12:2, Philippians 1:6, John 6:37-39, John 10:28, John 17:2, John 17:9, Revelation 21:1-4, Romans 8:31-39, 1 Peter 1:3-9"
  }
];

export default beliefs;

# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 23:50:42. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12260 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- PAINEL DO MOTORISTA -->
244: #secDriverPanel
246: <!-- Card do Veículo Vinculado -->
260: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
270: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
275: <!-- Aviso: nova versão do app Android -->
278: <!-- Aviso vermelho: notificações desligadas -->
281: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
285: <!-- Aviso de Pix / pagamento pendente -->
288: <!-- Navegação de Abas -->
306: <!-- Conteúdo das Abas Motorista -->
309: <!-- Aba CRLV-e -->
310: #tabDrvCrlv
315: <!-- Renderizado dinamicamente -->
319: <!-- Aba Contrato -->
320: #tabDrvContract
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Vistoria -->
335: #tabDrvInspection
342: <!-- Aba Pagamento -->
343: #tabDrvPayment
356: <!-- Caução e multas do motorista -->
358: <!-- Valor e descrição da cobrança -->
368: <!-- Seção Pix -->
382: <!-- QR Code Renderizado aqui -->
415: <!-- Seção Upload de Comprovante -->
432: <!-- Lista de comprovantes -->
437: <!-- Recibos quando o contrato está encerrado -->
444: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
445: #secMasterPanel
485: <!-- Aviso: falta criar a tabela dos termos no banco -->
488: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
490: <!-- Lista de Veículos -->
506: <!-- Renderizado via JS -->
513: <!-- Form de Adicionar Veículo -->
560: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
660: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
666: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
671: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
676: <!-- Fichas Arquivadas (após marcar caução pago) -->
685: <!-- Form de Adicionar Motorista -->
780: <!-- Barra de baixo do dono (só no design novo) -->
791: <!-- MODAL PRIMEIRO LOGIN -->
792: #modalFirstLogin
826: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
827: #modalNotif
840: <!-- MODAL VISTORIA (MASTER) -->
841: #modalInspection
854: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
855: #modalSettings
988: <!-- MODAL TEMAS -->
989: #modalThemes
1000: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1001: #modalCreds
1016: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1031: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1032: #modalDriverFile
1074: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1078: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1107: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1122: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1164: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1165: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1166: #modalRecibo
1185: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1186: #modalPixArea
1202: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1203: #modalIA
1285: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1286: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1287: #modalEditVeh
1324: #modalSenha
1346: #modalMeusRecibos
1364: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1365: #modalEmail
1385: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1386: #modalReport
1401: #modalFinCardDetail
1414: #modalFinance
1447: <!-- FILTROS -->
1497: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1517: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1518: #modalExpenses
1553: <!-- MODAL NOVO PIX -->
1554: #modalNewPix
1606: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1664: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1665: #modalCorrigirRecibo
1679: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1680: #modalContractWizard
1696: <!-- Seleção Motorista & Veículo -->
1708: <!-- Locador -->
1729: <!-- Locatário -->
1750: <!-- Veículo -->
1773: <!-- Configuração Comercial -->
1840: <!-- Cláusulas editáveis -->
1852: <!-- Prévia -->
1866: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1867: #modalContractDetail
1880: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1881: #modalInspectionTerm
1942: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
1965: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
1992: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
1993: #modalInspectionTermDetail
2006: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2007: #modalInspDamageConfirm
2022: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2023: #modalDocViewer
2031: #modalDocBody
2032: <!-- Conteúdo pré-visualizado -->
2038: #modalTerms
2052: <!-- NOTIFICAÇÕES TOAST -->
2069: lsGet()
2070: lsSet()
2071: lsDel()
2094: demoLoginRole()
2098: demoId()
2099: demoSave()
2100: demoSaved()
2102: *datas no horário de Brasília*
2103: demoLocal()
2104: demoParts()
2105: demoDay()
2106: demoNextDue()
2111: *dados fictícios (4 meses)*
2112: demoBuild()
2330: *documentos fictícios (imagem gerada na hora)*
2331: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2332: demoDocBlob()
2410: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2411: demoQuery()
2434: out()
2440: run()
2481: demoOnUpdate()
2491: demoOnInsert()
2603: demoClient()
2693: demoStart()
2701: demoStop()
2707: abrirDemo()
2714: trocarDemo()
2719: demoBanner()
2734: toEmail()
2738: showLogin()
2742: esc()
2747: dataHoraBR()
2755: uiDialogo()
2803: uiConfirm()
2812: uiPrompt()
2818: friendlyError()
2828: devicePrefs()
2831: saveDevicePrefs()
2834: docRef()
2835: viewDocIdx()
2837: setBusy()
2875: **TEMAS**
2884: currentTheme()
2889: applyTheme()
2890: openThemes()
2900: pickTheme()
2906: toggleDarkMode()
2908: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2910: loadDesignCfg()
2917: applyDesign()
2934: markMasterNav()
2941: fillDesignCfg()
2946: saveDesign()
2960: showToast()
2969: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2970: senhaErro()
2971: abrirSenha()
2980: salvarIaCodigo()
2990: fecharSenha()
2991: salvarSenha()
3012: loginUserInput()
3017: loginErro()
3021: verSenha()
3026: handleLogin()
3075: logout()
3094: saveFirstLoginPreferences()
3117: carregarDados()
3149: aplicarDados()
3190: loadAndRender()
3217: autoRefresh()
3256: markUpdated()
3261: reload()
3266: renderApp()
3314: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3317: masterBack()
3319: viewAsDriver()
3341: exitViewAs()
3360: viewOnly()
3361: renderViewAsBanner()
3371: showSection()
3376: withBtn()
3384: toggleDriverStatus()
3393: isOnline()
3395: updateStatusToggleUI()
3408: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3417: checkApkUpdate()
3432: updateInstallApkButton()
3452: renderDriverPanel()
3710: switchDriverTab()
3725: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3728: parsePixKey()
3732: normalizePixKey()
3740: pixKeyLooksOk()
3748: togglePixKeyFields()
3754: updatePixKeyPlaceholder()
3760: copyPixKey()
3767: copyPixCode()
3779: receiptBadge()
3789: receiptMasterBox()
3816: receiptAction()
3823: confirmReceipt()
3852: rejectReceipt()
3864: recheckReceipt()
3873: uploadReceipt()
3896: switchMasterTab()
3915: maskPhone()
3924: waLink()
3929: allVeh()
3930: allDrv()
3931: chargeVehicleId()
3943: enviarPedidoParcialAsaas()
3959: pedirPixParcial()
3977: restaurarPixTotal()
3983: responderPixParcial()
4007: contrato30Info()
4037: encerrarContrato()
4054: encerrarContratoPrompt()
4067: reativarContrato()
4091: marcarCaucaoPagoArquivar()
4112: desarquivarFicha()
4130: deliveryInspectionHtml()
4169: uploadDeliveryPhotos()
4196: delDeliveryPhoto()
4214: addCauDesconto()
4239: puxarMultaCaucao()
4260: delCauDesconto()
4282: dfCauDescontosHtml()
4315: dfContratoRender()
4359: encerrarContratoConfirmFicha()
4366: renderMasterPanel()
4530: renderArchivedDrivers()
4575: handleAddVehicle()
4615: deleteVehicle()
4616: cancelDeleteVehicle()
4618: confirmDeleteVehicle()
4642: abrirEditarVeiculo()
4664: evReadStoredCrlv()
4689: evReadChosenCrlv()
4705: fecharEditarVeiculo()
4706: salvarEditarVeiculo()
4743: drvCauMostra()
4750: drvCauLer()
4758: handleAddDriver()
4836: marcarSituacao()
4846: updateDriverPaymentStatus()
4855: deleteDriver()
4856: cancelDeleteDriver()
4858: confirmDeleteDriver()
4881: prepareFile()
4903: uploadFile()
4914: fileUrl()
4925: downloadName()
4929: renderFilePreview()
4949: renderPdfToCanvas()
4976: viewDoc()
4997: **DINHEIRO**
4998: parseMoney()
5005: fmtMoney()
5006: fmtDate()
5007: todayISO()
5009: **CONFIGURAÇÕES (Gemini e Google Drive)**
5011: loadConfigStatus()
5016: paintConfig()
5021: fillOwnerVehicleSelect()
5027: saveOwnerVehicle()
5049: locadorMerged()
5062: getLocadoresList()
5082: locadorForVehicle()
5091: fillLocadorSettings()
5111: cfgOnLocadorChange()
5112: upsertLocadorInList()
5142: deleteLocadorSetting()
5158: saveLocadorSettings()
5186: openSettings()
5201: closeSettings()
5202: saveConfig()
5212: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5213: renderAsaasDrivers()
5240: toggleDriverAsaas()
5272: getAtrasoCfg()
5276: fillAtrasoCfg()
5283: saveAtrasoCfg()
5300: atrasoDataBR()
5305: atrasoPrazoUtil()
5312: calcEncargosAtraso()
5331: ehLinhaEncargo()
5332: calcAtrasoMotorista()
5362: atualizarPixAtraso()
5375: loadAsaasInfo()
5389: saveAsaas()
5397: testarAsaas()
5404: copiarAsaas()
5408: testDrive()
5415: resyncDrive()
5423: **FICHA DO MOTORISTA**
5426: openDriverFile()
5458: closeDriverFile()
5460: saveDriverFile()
5525: aiFillDriver()
5564: **CONTROLE FINANCEIRO**
5565: finRange()
5582: dayBR()
5583: inRange()
5585: onFinPeriodChange()
5591: fillFinFilters()
5599: clearFinFilters()
5603: updateFinFilterCount()
5612: openFinance()
5618: switchFinTab()
5629: finCardBtn()
5637: closeFinCardDetail()
5638: closeFinance()
5640: collectRentFinData()
5691: renderFinance()
5749: openFinCardDetail()
5956: openFinExtrato()
6050: renderFinExtratoView()
6131: openFinExtratoReport()
6148: renderFinGrafico()
6168: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6170: okEmail()
6172: openEmailCompose()
6193: closeEmailCompose()
6194: sendEmailCompose()
6209: emailRecibo()
6214: emailIA()
6222: **RELATÓRIO DO FINANCEIRO**
6224: finFiltersText()
6229: finPeriodText()
6236: buildReportHtml()
6258: openFinReport()
6268: closeFinReport()
6269: printFinReport()
6273: shareFinReport()
6283: emailFinReport()
6289: **DESPESAS DO VEÍCULO**
6291: openExpenses()
6303: closeExpenses()
6304: fillExpenseTypes()
6309: createExpenseType()
6324: aiReadExpense()
6356: renderExpenses()
6378: saveExpense()
6405: deleteExpense()
6434: inspSlotLabel()
6437: photoDamageBadge()
6446: photoCard()
6484: inspectionHtml()
6531: hydrateImages()
6537: openInspection()
6545: closeInspection()
6549: renderInspectionModal()
6556: uploadInspection()
6605: deleteInspectionPhoto()
6625: fmtDue()
6631: nextDueLocal()
6642: openNewPix()
6672: **CAUÇÃO DO MOTORISTA**
6673: cauOf()
6674: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6675: devOf()
6676: devCobrancas()
6678: devPrevisao()
6686: dfDevRender()
6713: dfDevIr()
6714: dfDevSalvar()
6719: dfDevAvisar()
6725: dfDevDesfazer()
6729: dfDevReceber()
6738: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6742: cauPlano()
6750: cauParcela()
6757: cauParcelasTexto()
6761: cauNext()
6768: dfCauFill()
6778: dfCauCalc()
6806: dfCauRead()
6819: expTypeName()
6823: driverFinVehicleId()
6835: cauEntradaItem()
6849: cauPagoDespesaItem()
6864: **CAUÇÃO: quanto já foi pago**
6866: cauStatus()
6876: obsResumoHtml()
6877: cauResumoHtml()
6882: **MULTAS E OUTRAS DESPESAS**
6883: multasOf()
6885: multaPagaAuto()
6890: multasAbertas()
6891: multasPendentes()
6892: multasResumoHtml()
6900: cobOf()
6901: dfCobFill()
6907: dfCobRead()
6910: dfCobInfo()
6920: cobResumoHtml()
6924: ajustesOf()
6928: ajusteVale()
6929: isoDia()
6931: vencProxima()
6932: previsaoProxima()
6946: previsaoHtml()
6950: dfAjRender()
6956: addAjuste()
6965: delAjuste()
6970: abrirAjustes()
6971: renderProxCobrancas()
6977: savePixExtra()
6985: dfMultFill()
6993: fdPaga()
6994: dfMultRender()
7003: toggleMultas()
7010: addMulta()
7020: delMulta()
7028: multaPaga()
7037: renderDriverExtras()
7065: mondayAfter()
7073: renderDriverProfileExtras()
7139: semanaDoPix()
7145: **MEUS RECIBOS (área do motorista)**
7147: meusRecibosLista()
7151: reciboRowHtml()
7159: renderEncerradoRecibos()
7164: openMeuReciboDireto()
7165: openMeusRecibos()
7172: closeMeusRecibos()
7173: reciboPdfHtml()
7184: verMeuRecibo()
7191: voltarMeusRecibos()
7192: pdfMeuRecibo()
7196: shareMeuRecibo()
7205: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7206: editVehicleRent()
7223: nextParcel()
7229: fillNewPixValues()
7265: newPixParts()
7296: **PERÍODO E VENCIMENTO DA COBRANÇA**
7297: dataISO()
7298: dataDe()
7299: dataMais()
7300: dataBR()
7301: diasEntre()
7302: isoSP()
7303: pixPeriodo()
7310: pixDesc()
7311: pixDiasPeriodo()
7316: marcarAjustesPorVenc()
7321: pixDatasNovo()
7330: pixDatasMudou()
7341: pixAluguelProporcional()
7349: pixPeriodoInfo()
7362: pixAddLinha()
7369: pixLinhas()
7371: descSoma()
7381: calcNewPix()
7390: **RECIBO DE PAGAMENTO**
7394: receiptValue()
7395: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7396: atrasoDados()
7400: cobrarAtraso()
7417: allocatePix()
7436: reciboData()
7459: fmtDateTimeBR()
7460: reciboTexto()
7511: openRecibo()
7528: closeRecibo()
7529: **CORRIGIR RECIBO**
7531: corrigirLinhaHtml()
7541: openCorrigirRecibo()
7564: closeCorrigirRecibo()
7565: corrigirLer()
7571: corrigirSoma()
7578: salvarCorrigirRecibo()
7595: copyRecibo()
7600: reciboCanvas()
7617: reciboPdfBlob()
7635: shareReciboPdf()
7651: rotularTabelas()
7669: areaAberta()
7670: markAreas()
7680: closeAreas()
7684: toggleArea()
7692: dobraSalva()
7693: setDobra()
7698: toggleDobra()
7705: dobraTopo()
7712: renderMasterResumo()
7726: renderMasterTopo()
7748: loadIA()
7770: updateIABadge()
7775: loadIASetting()
7781: paintIASwitch()
7787: toggleIA()
7794: loadRobo()
7803: iaPrepararQr()
7808: paintRobo()
7837: pedirCodigoRobo()
7846: toggleRobo()
7861: iaTodosGerar()
7879: iaTodosCancelar()
7883: iaTodosConfirmar()
7897: loadIARules()
7902: iaAbrirPdf()
7908: renderIARules()
7912: saveIARules()
7917: addIARule()
7922: delIARule()
7926: openIA()
7941: closeIA()
7942: iaShow()
7943: iaPhone()
7948: renderIA()
7990: iaAprovar()
7999: iaPhone2()
8000: iaSend()
8031: iaMark()
8042: iaDelete()
8053: openPixArea()
8062: closePixArea()
8063: renderPixArea()
8107: openEditPix()
8136: deletePix()
8148: closeNewPix()
8150: saveNewPix()
8241: pushSupported()
8242: isIOS()
8243: isStandalone()
8244: b64ToBytes()
8250: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8255: notifStatus()
8263: stepsList()
8267: notifHelpHtml()
8301: renderNotifModal()
8313: checkDriverNotifications()
8346: activateFromModal()
8359: refreshNotifButton()
8378: subscribePush()
8393: enableNotifications()
8413: closeDocViewer()
8421: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8433: allFeaturesOn()
8434: feat()
8435: loadDriverFeatures()
8442: saveDriverFeatures()
8447: drawFeatureToggles()
8462: setAllFeatures()
8473: applyDriverFeatures()
8488: **PIX: conferência do código e QR code desenhado no aparelho**
8489: crc16()
8497: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8499: pixTxt()
8500: pixCampo()
8501: pixGerarCodigo()
8511: pixAutoLigado()
8512: pixAutoMudou()
8517: gerarPixAuto()
8533: pixRecebedorCarregar()
8544: pixRecebedorGuardar()
8551: pixValid()
8557: renderPixQr()
8567: previewNewPixQr()
8577: **FOTO DO MOTORISTA (recortada da CNH)**
8578: photoPath()
8579: fileToCanvas()
8598: cropPhoto()
8612: savePhoto()
8617: photoBoxFrom()
8623: fillAvatar()
8634: fillAvatars()
8647: storedFile()
8654: photoFromCnh()
8666: **FOTO DO PERFIL ACOMPANHA A CNH**
8669: cnhStamp()
8670: photoFiles()
8678: avatarPath()
8683: syncCnhPhotos()
8707: pickImage()
8710: changeDriverPhoto()
8726: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8728: uploadTmp()
8735: clearTmp()
8740: aiReadFiles()
8746: okDateISO()
8748: noAccents()
8750: makeUsername()
8759: titleCase()
8760: syncNewDriverAccess()
8766: setNewDriverPhoto()
8771: pickNewDriverPhoto()
8775: resetNewDriverForm()
8783: newDriverDocChosen()
8817: anoCrlv()
8821: formatVehicleBrand()
8826: inferVehicleBrand()
8835: normalizeCrlvFields()
8854: applyCrlvFields()
8867: aiReadCrlv()
8881: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
8882: sendWelcomeEmail()
8888: showCredentials()
8899: demoAssistente()
8918: **PERGUNTAR À IA (ÁREA IA, só o master)**
8922: iaChatReset()
8923: iaNorm()
8924: iaAcha()
8930: iaVeicTxt()
8931: iaCamposVeic()
8932: iaDataOk()
8933: iaOpcoes()
8934: iaTodosMotoristas()
8938: iaFerramenta()
9033: renderIAChat()
9050: iaChatDica()
9051: iaChatEnviar()
9086: iaChatNota()
9087: iaCancelarCartao()
9088: iaConfirmarCartao()
9133: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9134: syncAppFinState()
9143: renderAppEarnings()
9223: saveAppEarning()
9250: workDayISO()
9251: paintDayOff()
9260: renderDayOff()
9267: setDayOff()
9277: aiReadEarning()
9310: **DESPESAS DO APLICATIVO**
9312: appExpCustomTypes()
9313: fillAppExpTypes()
9320: onAppExpTypeChange()
9325: saveAppExpense()
9350: deleteAppExpense()
9359: deleteAppEarning()
9456: loadTermsAcceptances()
9468: termsOf()
9469: currentAcceptance()
9470: needsTermsAcceptance()
9473: fmtDateTime()
9476: termsPlainText()
9480: termsHash()
9488: openTermsGate()
9511: termsGateCheck()
9519: acceptTerms()
9539: acceptanceHtml()
9550: openTermsViewer()
9568: closeTerms()
9574: downloadTermsCopy()
9595: termsBadgeMaster()
9602: termsMasterDetail()
9643: renderTermsSetupBanner()
9656: copyTermsSql()
9666: cnhExpired()
9667: cnhWaiting()
9668: onlyDigits()
9669: normName()
9671: verifyCnh()
9683: renderCnhBanner()
9701: sendNewCnh()
9749: cnhBadgeMaster()
9757: applyPendingCnh()
9765: autoReadNewCnhs()
9783: cnhPendingHtml()
9797: recheckPendingCnh()
9807: rejectPendingCnh()
9817: showContractDoc()
9917: contractPeriodLabel()
9918: contractStatusBadge()
9922: pdfSafeText()
9934: contractPdfFileName()
9943: cwBuildDepositChargeText()
9980: cwBuildDepositClauseText()
9992: buildDefaultClauses()
10039: generateContractPdfBytes()
10058: drawHeader()
10063: newPage()
10070: ensureSpace()
10073: wrapLines()
10097: drawJustifiedLine()
10210: renderContractsTab()
10264: renderDriverRentalContractsBox()
10323: openContractForDriver()
10330: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10332: closeContractWizard()
10333: cwPopulateSelects()
10341: cwPopulateLocadores()
10353: cwOnLocadorChange()
10362: cwFillLocador()
10369: cwFillDepositFromDriver()
10397: cwFillDepositFromComercial()
10419: cwSyncDepositClauseOnly()
10429: cwDepCalc()
10474: cwFillDriver()
10492: cwUpdateCrlvBar()
10501: cwNeedsCrlvFill()
10505: cwRefreshMissingBoxIfVisible()
10514: cwReadVehicleCrlv()
10563: cwReadCurrentVehicleCrlv()
10569: cwFillVehicle()
10591: cwOnDriverChange()
10599: cwOnVehicleChange()
10610: cwReadSnapshot()
10651: cwRenderClausesEditor()
10661: cwRebuildClauses()
10669: cwRenderPreview()
10699: cwTogglePreview()
10704: validateContractForEmission()
10721: openContractWizard()
10821: cwSyncSources()
10861: logContractHistory()
10870: persistContract()
10958: saveContractDraft()
10959: emitContract()
10961: ensureContractPdfBlob()
10971: downloadContractPdf()
10983: printContractPdf()
10996: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
10997: closeContractDetail()
10998: openContractDetail()
11067: saveContractSignatures()
11092: uploadSignedContractFile()
11112: terminateContractPrompt()
11127: cancelContractPrompt()
11167: inspectionTypeBadge()
11171: inspectionStatusBadge()
11175: inspectionPdfFileName()
11182: switchContractsSubtab()
11195: renderInspectionsTab()
11255: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11256: runInspectionBatchAI()
11279: promptInspectionDamageConfirmation()
11357: processInspectionPhotosWithAI()
11412: analyzeSavedInspectionPhotos()
11428: renameInspectionPhoto()
11444: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11447: closeInspectionWizard()
11448: openInspectionWizard()
11509: iwCollectSavedPhotosFor()
11542: iwPopulateContractsAndBase()
11557: iwSyncHeaderAndLegal()
11569: iwOnTypeChange()
11575: iwOnVehicleChange()
11588: iwOnDriverChange()
11593: iwOnContractChange()
11600: iwImportSavedPhotos()
11611: iwUploadPhotos()
11655: iwRunAIOnList()
11681: iwAnalyzeWithAI()
11688: iwRenderPhotos()
11726: iwUpdatePhotoField()
11731: iwUpdatePhotoDamage()
11739: iwRemovePhoto()
11745: iwRenderDamagesSummary()
11760: iwRenderComparison()
11779: iwRenderChecklist()
11798: persistInspectionTerm()
11889: saveInspectionDraft()
11890: emitInspectionTerm()
11892: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
11893: blobToEmbeddableJpeg()
11922: generateInspectionPdfBytes()
12106: ensureInspectionPdfBlob()
12115: downloadInspectionPdf()
12127: printInspectionPdf()
12140: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
12141: closeInspectionDetail()
12142: openInspectionDetail()
12199: saveInspectionSignatures()
12223: uploadSignedInspectionFile()
12243: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)

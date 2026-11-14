# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 23:31:12. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13639 linhas)

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
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1864: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1932: <!-- Cláusulas editáveis -->
1944: <!-- Prévia -->
1958: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1959: #modalContractDetail
1972: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1973: #modalInspectionTerm
2034: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2057: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2097: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2098: #modalInspectionTermDetail
2111: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2112: #modalInspDamageConfirm
2127: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2128: #modalDocViewer
2136: #modalDocBody
2137: <!-- Conteúdo pré-visualizado -->
2143: #modalTerms
2157: <!-- NOTIFICAÇÕES TOAST -->
2174: lsGet()
2175: lsSet()
2176: lsDel()
2199: demoLoginRole()
2203: demoId()
2204: demoSave()
2205: demoSaved()
2207: *datas no horário de Brasília*
2208: demoLocal()
2209: demoParts()
2210: demoDay()
2211: demoNextDue()
2216: *dados fictícios (4 meses)*
2217: demoBuild()
2450: *documentos fictícios (imagem gerada na hora)*
2451: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2452: demoDocBlob()
2530: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2531: demoQuery()
2554: out()
2560: run()
2601: demoOnUpdate()
2611: demoOnInsert()
2723: demoClient()
2926: demoStart()
2934: demoStop()
2940: abrirDemo()
2947: trocarDemo()
2952: demoBanner()
2967: toEmail()
2971: showLogin()
2975: esc()
2980: toBRTInput()
2993: parseBRTInputToIso()
3002: dataHoraBR()
3016: uiDialogo()
3064: uiConfirm()
3073: uiPrompt()
3079: friendlyError()
3089: unwrapInvokeResult()
3109: devicePrefs()
3112: saveDevicePrefs()
3115: docRef()
3116: viewDocIdx()
3118: setBusy()
3161: **TEMAS**
3170: currentTheme()
3175: applyTheme()
3176: openThemes()
3186: pickTheme()
3192: toggleDarkMode()
3194: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3196: loadDesignCfg()
3203: applyDesign()
3220: markMasterNav()
3227: fillDesignCfg()
3232: saveDesign()
3246: showToast()
3255: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3256: senhaErro()
3257: abrirSenha()
3266: salvarIaCodigo()
3276: fecharSenha()
3277: salvarSenha()
3298: loginUserInput()
3303: loginErro()
3307: verSenha()
3312: handleLogin()
3361: logout()
3380: saveFirstLoginPreferences()
3403: carregarDados()
3435: aplicarDados()
3476: loadAndRender()
3503: autoRefresh()
3542: markUpdated()
3547: reload()
3552: renderApp()
3600: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3603: masterBack()
3605: viewAsDriver()
3627: exitViewAs()
3646: viewOnly()
3647: renderViewAsBanner()
3657: showSection()
3662: withBtn()
3670: toggleDriverStatus()
3679: isOnline()
3681: updateStatusToggleUI()
3694: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3703: checkApkUpdate()
3718: updateInstallApkButton()
3738: renderDriverPanel()
3996: switchDriverTab()
4011: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4014: parsePixKey()
4018: normalizePixKey()
4026: pixKeyLooksOk()
4034: togglePixKeyFields()
4040: updatePixKeyPlaceholder()
4046: copyPixKey()
4053: copyPixCode()
4065: receiptBadge()
4075: receiptMasterBox()
4102: receiptAction()
4109: confirmReceipt()
4138: rejectReceipt()
4150: recheckReceipt()
4159: uploadReceipt()
4182: switchMasterTab()
4201: maskPhone()
4210: waLink()
4215: allVeh()
4216: allDrv()
4217: chargeVehicleId()
4229: enviarPedidoParcialAsaas()
4245: pedirPixParcial()
4263: restaurarPixTotal()
4269: responderPixParcial()
4293: contrato30Info()
4323: encerrarContrato()
4340: encerrarContratoPrompt()
4353: reativarContrato()
4377: marcarCaucaoPagoArquivar()
4398: desarquivarFicha()
4416: deliveryInspectionHtml()
4455: uploadDeliveryPhotos()
4482: delDeliveryPhoto()
4500: addCauDesconto()
4525: puxarMultaCaucao()
4546: delCauDesconto()
4568: dfCauDescontosHtml()
4601: dfContratoRender()
4645: encerrarContratoConfirmFicha()
4652: renderMasterPanel()
4816: renderArchivedDrivers()
4861: handleAddVehicle()
4901: deleteVehicle()
4902: cancelDeleteVehicle()
4904: confirmDeleteVehicle()
4928: abrirEditarVeiculo()
4950: evReadStoredCrlv()
4975: evReadChosenCrlv()
4991: fecharEditarVeiculo()
4992: salvarEditarVeiculo()
5029: drvCauMostra()
5036: drvCauLer()
5044: handleAddDriver()
5122: marcarSituacao()
5132: updateDriverPaymentStatus()
5141: deleteDriver()
5142: cancelDeleteDriver()
5144: confirmDeleteDriver()
5166: isImageFile()
5168: prepareFile()
5190: uploadFile()
5201: fileUrl()
5212: downloadName()
5216: renderFilePreview()
5236: renderPdfToCanvas()
5263: viewDoc()
5284: **DINHEIRO**
5285: parseMoney()
5292: fmtMoney()
5293: fmtDate()
5294: todayISO()
5296: **CONFIGURAÇÕES (Gemini e Google Drive)**
5298: loadConfigStatus()
5303: paintConfig()
5308: fillOwnerVehicleSelect()
5314: saveOwnerVehicle()
5336: locadorMerged()
5349: getLocadoresList()
5369: locadorForVehicle()
5378: fillLocadorSettings()
5398: cfgOnLocadorChange()
5399: upsertLocadorInList()
5429: deleteLocadorSetting()
5445: saveLocadorSettings()
5473: openSettings()
5488: closeSettings()
5489: saveConfig()
5499: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5500: renderAsaasDrivers()
5527: toggleDriverAsaas()
5559: getAtrasoCfg()
5563: fillAtrasoCfg()
5570: saveAtrasoCfg()
5587: atrasoDataBR()
5592: atrasoPrazoUtil()
5599: calcEncargosAtraso()
5618: ehLinhaEncargo()
5619: calcAtrasoMotorista()
5649: atualizarPixAtraso()
5662: loadAsaasInfo()
5676: saveAsaas()
5684: testarAsaas()
5691: copiarAsaas()
5695: testDrive()
5702: resyncDrive()
5710: **FICHA DO MOTORISTA**
5713: openDriverFile()
5745: closeDriverFile()
5747: saveDriverFile()
5812: aiFillDriver()
5851: **CONTROLE FINANCEIRO**
5852: finRange()
5869: dayBR()
5870: inRange()
5872: onFinPeriodChange()
5878: fillFinFilters()
5886: clearFinFilters()
5890: updateFinFilterCount()
5899: openFinance()
5905: switchFinTab()
5916: finCardBtn()
5924: closeFinCardDetail()
5925: closeFinance()
5927: collectRentFinData()
5978: renderFinance()
6036: openFinCardDetail()
6243: openFinExtrato()
6337: renderFinExtratoView()
6418: openFinExtratoReport()
6435: renderFinGrafico()
6455: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6457: okEmail()
6459: openEmailCompose()
6480: closeEmailCompose()
6481: sendEmailCompose()
6496: emailRecibo()
6501: emailIA()
6509: **RELATÓRIO DO FINANCEIRO**
6511: finFiltersText()
6516: finPeriodText()
6523: buildReportHtml()
6545: openFinReport()
6555: closeFinReport()
6556: printFinReport()
6560: shareFinReport()
6570: emailFinReport()
6576: **DESPESAS DO VEÍCULO**
6578: openExpenses()
6590: closeExpenses()
6591: fillExpenseTypes()
6596: createExpenseType()
6611: aiReadExpense()
6643: renderExpenses()
6665: saveExpense()
6692: deleteExpense()
6721: inspSlotLabel()
6724: normalizeInspDbSlot()
6727: photoDamageBadge()
6736: buildVehicleInspectionReport()
6773: copyVehicleInspectionText()
6781: photoCard()
6823: inspectionHtml()
6903: hydrateImages()
6909: openInspection()
6917: closeInspection()
6921: renderInspectionModal()
6928: uploadInspection()
6985: deleteInspectionPhoto()
7005: fmtDue()
7011: nextDueLocal()
7022: openNewPix()
7052: **CAUÇÃO DO MOTORISTA**
7053: cauOf()
7054: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7055: devOf()
7056: devCobrancas()
7058: devPrevisao()
7066: dfDevRender()
7093: dfDevIr()
7094: dfDevSalvar()
7099: dfDevAvisar()
7105: dfDevDesfazer()
7109: dfDevReceber()
7118: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7122: cauPlano()
7130: cauParcela()
7137: cauParcelasTexto()
7141: cauNext()
7148: dfCauFill()
7158: dfCauCalc()
7186: dfCauRead()
7199: expTypeName()
7203: driverFinVehicleId()
7215: cauEntradaItem()
7229: cauPagoDespesaItem()
7244: **CAUÇÃO: quanto já foi pago**
7246: cauStatus()
7256: obsResumoHtml()
7257: cauResumoHtml()
7262: **MULTAS E OUTRAS DESPESAS**
7263: multasOf()
7265: multaPagaAuto()
7270: multasAbertas()
7271: multasPendentes()
7272: multasResumoHtml()
7280: cobOf()
7281: dfCobFill()
7287: dfCobRead()
7290: dfCobInfo()
7300: cobResumoHtml()
7304: ajustesOf()
7308: ajusteVale()
7309: isoDia()
7311: vencProxima()
7312: previsaoProxima()
7326: previsaoHtml()
7330: dfAjRender()
7336: addAjuste()
7345: delAjuste()
7350: abrirAjustes()
7351: renderProxCobrancas()
7357: savePixExtra()
7365: dfMultFill()
7373: fdPaga()
7374: dfMultRender()
7383: toggleMultas()
7390: addMulta()
7400: delMulta()
7408: multaPaga()
7417: renderDriverExtras()
7445: mondayAfter()
7453: renderDriverProfileExtras()
7519: semanaDoPix()
7525: **MEUS RECIBOS (área do motorista)**
7527: meusRecibosLista()
7531: reciboRowHtml()
7539: renderEncerradoRecibos()
7544: openMeuReciboDireto()
7545: openMeusRecibos()
7552: closeMeusRecibos()
7553: reciboPdfHtml()
7564: verMeuRecibo()
7571: voltarMeusRecibos()
7572: pdfMeuRecibo()
7576: shareMeuRecibo()
7585: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7586: editVehicleRent()
7603: nextParcel()
7609: fillNewPixValues()
7645: newPixParts()
7676: **PERÍODO E VENCIMENTO DA COBRANÇA**
7677: dataISO()
7678: dataDe()
7679: dataMais()
7680: dataBR()
7681: diasEntre()
7682: isoSP()
7683: pixPeriodo()
7690: pixDesc()
7691: pixDiasPeriodo()
7696: marcarAjustesPorVenc()
7701: pixDatasNovo()
7710: pixDatasMudou()
7721: pixAluguelProporcional()
7729: pixPeriodoInfo()
7742: pixAddLinha()
7749: pixLinhas()
7751: descSoma()
7761: calcNewPix()
7770: **RECIBO DE PAGAMENTO**
7774: receiptValue()
7775: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7776: atrasoDados()
7780: cobrarAtraso()
7797: allocatePix()
7816: reciboData()
7839: fmtDateTimeBR()
7840: reciboTexto()
7891: openRecibo()
7908: closeRecibo()
7909: **CORRIGIR RECIBO**
7911: corrigirLinhaHtml()
7921: openCorrigirRecibo()
7944: closeCorrigirRecibo()
7945: corrigirLer()
7951: corrigirSoma()
7958: salvarCorrigirRecibo()
7975: copyRecibo()
7980: reciboCanvas()
7997: reciboPdfBlob()
8015: shareReciboPdf()
8031: rotularTabelas()
8049: areaAberta()
8050: markAreas()
8060: closeAreas()
8064: toggleArea()
8072: dobraSalva()
8073: setDobra()
8078: toggleDobra()
8085: dobraTopo()
8092: renderMasterResumo()
8106: renderMasterTopo()
8128: loadIA()
8150: updateIABadge()
8155: loadIASetting()
8161: paintIASwitch()
8167: toggleIA()
8174: loadRobo()
8183: iaPrepararQr()
8188: paintRobo()
8217: pedirCodigoRobo()
8226: toggleRobo()
8241: iaTodosGerar()
8259: iaTodosCancelar()
8263: iaTodosConfirmar()
8277: loadIARules()
8282: iaAbrirPdf()
8288: renderIARules()
8292: saveIARules()
8297: addIARule()
8302: delIARule()
8306: openIA()
8321: closeIA()
8322: iaShow()
8323: iaPhone()
8328: renderIA()
8370: iaAprovar()
8379: iaPhone2()
8380: iaSend()
8411: iaMark()
8422: iaDelete()
8433: openPixArea()
8442: closePixArea()
8443: renderPixArea()
8487: openEditPix()
8516: deletePix()
8528: closeNewPix()
8530: saveNewPix()
8621: pushSupported()
8622: isIOS()
8623: isStandalone()
8624: b64ToBytes()
8630: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8635: notifStatus()
8643: stepsList()
8647: notifHelpHtml()
8681: renderNotifModal()
8693: checkDriverNotifications()
8726: activateFromModal()
8739: refreshNotifButton()
8758: subscribePush()
8773: enableNotifications()
8793: closeDocViewer()
8801: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8813: allFeaturesOn()
8814: feat()
8815: loadDriverFeatures()
8822: saveDriverFeatures()
8827: drawFeatureToggles()
8842: setAllFeatures()
8853: applyDriverFeatures()
8868: **PIX: conferência do código e QR code desenhado no aparelho**
8869: crc16()
8877: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8879: pixTxt()
8880: pixCampo()
8881: pixGerarCodigo()
8891: pixAutoLigado()
8892: pixAutoMudou()
8897: gerarPixAuto()
8913: pixRecebedorCarregar()
8924: pixRecebedorGuardar()
8931: pixValid()
8937: renderPixQr()
8947: previewNewPixQr()
8957: **FOTO DO MOTORISTA (recortada da CNH)**
8958: photoPath()
8959: fileToCanvas()
8978: cropPhoto()
8992: savePhoto()
8997: photoBoxFrom()
9003: fillAvatar()
9014: fillAvatars()
9027: storedFile()
9034: photoFromCnh()
9046: **FOTO DO PERFIL ACOMPANHA A CNH**
9049: cnhStamp()
9050: photoFiles()
9058: avatarPath()
9063: syncCnhPhotos()
9087: pickImage()
9090: changeDriverPhoto()
9106: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9108: uploadTmp()
9115: clearTmp()
9120: aiReadFiles()
9126: okDateISO()
9128: noAccents()
9130: makeUsername()
9139: titleCase()
9140: syncNewDriverAccess()
9146: setNewDriverPhoto()
9151: pickNewDriverPhoto()
9155: resetNewDriverForm()
9163: newDriverDocChosen()
9197: anoCrlv()
9201: formatVehicleBrand()
9206: inferVehicleBrand()
9215: normalizeCrlvFields()
9234: applyCrlvFields()
9247: aiReadCrlv()
9261: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9262: sendWelcomeEmail()
9268: showCredentials()
9279: demoAssistente()
9298: **PERGUNTAR À IA (ÁREA IA, só o master)**
9302: iaChatReset()
9303: iaNorm()
9304: iaAcha()
9310: iaVeicTxt()
9311: iaCamposVeic()
9312: iaDataOk()
9313: iaOpcoes()
9314: iaTodosMotoristas()
9318: iaFerramenta()
9413: renderIAChat()
9430: iaChatDica()
9431: iaChatEnviar()
9466: iaChatNota()
9467: iaCancelarCartao()
9468: iaConfirmarCartao()
9513: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9514: syncAppFinState()
9523: renderAppEarnings()
9603: saveAppEarning()
9630: workDayISO()
9631: paintDayOff()
9640: renderDayOff()
9647: setDayOff()
9657: aiReadEarning()
9690: **DESPESAS DO APLICATIVO**
9692: appExpCustomTypes()
9693: fillAppExpTypes()
9700: onAppExpTypeChange()
9705: saveAppExpense()
9730: deleteAppExpense()
9739: deleteAppEarning()
9836: loadTermsAcceptances()
9848: termsOf()
9849: currentAcceptance()
9850: needsTermsAcceptance()
9853: fmtDateTime()
9856: termsPlainText()
9860: termsHash()
9868: openTermsGate()
9891: termsGateCheck()
9899: acceptTerms()
9919: acceptanceHtml()
9930: openTermsViewer()
9948: closeTerms()
9954: downloadTermsCopy()
9975: termsBadgeMaster()
9982: termsMasterDetail()
10023: renderTermsSetupBanner()
10036: copyTermsSql()
10046: cnhExpired()
10047: cnhWaiting()
10048: onlyDigits()
10049: normName()
10051: verifyCnh()
10063: renderCnhBanner()
10081: sendNewCnh()
10129: cnhBadgeMaster()
10137: applyPendingCnh()
10145: autoReadNewCnhs()
10163: cnhPendingHtml()
10177: recheckPendingCnh()
10187: rejectPendingCnh()
10197: showContractDoc()
10315: inspectPdfSignaturesBytes()
10334: readPdfFileAsBase64AndInspect()
10349: govBrSignersList()
10361: renderGovBrFlowBox()
10413: driverGovBrBlockHtml()
10442: govBrPublicAppBaseUrl()
10446: createGovBrInvite()
10478: submitMasterGovBrPdf()
10499: submitDriverGovBrPdf()
10518: loadGovBrInvitePage()
10589: submitGovBrInvitePdf()
10608: exitGovBrInviteToLogin()
10627: contractPeriodLabel()
10628: contractStatusBadge()
10632: pdfSafeText()
10644: contractPdfFileName()
10653: cwBuildDepositChargeText()
10695: cwBuildDepositClauseText()
10707: lcClauseStart()
10714: buildDefaultClauses()
10785: generateContractPdfBytes()
10804: drawHeader()
10809: newPage()
10816: ensureSpace()
10819: wrapLines()
10843: drawJustifiedLine()
11109: renderContractsTab()
11163: renderDriverRentalContractsBox()
11222: openContractForDriver()
11229: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11231: closeContractWizard()
11232: cwPopulateSelects()
11240: cwPopulateLocadores()
11252: cwOnLocadorChange()
11261: defaultWitness1ForLocador()
11269: cwApplyDefaultWitness1()
11282: cwFillLocador()
11291: cwFillDepositFromDriver()
11319: cwFillDepositFromComercial()
11341: cwSyncClauseIdx()
11350: cwSyncDepositClauseOnly()
11351: cwUpdateTrialPreview()
11367: cwDepCalc()
11412: cwApplyDriverContractDefaults()
11429: cwFillDriver()
11448: cwUpdateCrlvBar()
11457: cwNeedsCrlvFill()
11461: cwRefreshMissingBoxIfVisible()
11470: cwReadVehicleCrlv()
11519: cwReadCurrentVehicleCrlv()
11525: cwFillVehicle()
11547: cwOnDriverChange()
11563: cwOnVehicleChange()
11576: cwDefaultChecklist()
11581: cwToggleVistoriaFields()
11586: cwRenderInspChecklist()
11605: cwRenderInspDamagesSummary()
11619: cwRenderInspPhotos()
11656: cwUpdateInspPhotoDamage()
11664: cwSyncVistoriaFromVehicle()
11681: cwImportSavedPhotos()
11697: cwUploadInspPhotos()
11737: cwAnalyzeInspWithAI()
11746: cwReadSnapshot()
11805: cwRenderClausesEditor()
11815: cwRebuildClauses()
11823: cwRenderPreview()
11878: cwTogglePreview()
11883: validateContractForEmission()
11900: openContractWizard()
12035: cwSyncSources()
12090: logContractHistory()
12099: persistContract()
12190: saveContractDraft()
12191: emitContract()
12193: ensureContractPdfBlob()
12204: downloadContractPdf()
12216: printContractPdf()
12229: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12230: closeContractDetail()
12231: openContractDetail()
12304: saveContractSignatures()
12331: uploadSignedContractFile()
12353: terminateContractPrompt()
12368: clearDriverPathsIfMatching()
12378: cancelContractPrompt()
12394: deleteContractPrompt()
12448: inspectionTypeBadge()
12452: inspectionStatusBadge()
12456: inspectionPdfFileName()
12463: switchContractsSubtab()
12476: renderInspectionsTab()
12536: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12537: runInspectionBatchAI()
12560: promptInspectionDamageConfirmation()
12638: processInspectionPhotosWithAI()
12694: analyzeSavedInspectionPhotos()
12710: renameInspectionPhoto()
12726: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12729: closeInspectionWizard()
12730: openInspectionWizard()
12794: iwCollectSavedPhotosFor()
12827: iwPopulateContractsAndBase()
12850: iwSyncHeaderAndLegal()
12862: iwOnTypeChange()
12868: iwOnVehicleChange()
12886: iwOnDriverChange()
12891: iwOnContractChange()
12898: iwImportSavedPhotos()
12909: iwUploadPhotos()
12962: iwResolveEntregaBaseline()
12983: iwRunAIOnList()
13009: iwAnalyzeWithAI()
13016: iwRenderPhotos()
13055: iwUpdatePhotoField()
13060: iwUpdatePhotoDamage()
13068: iwRemovePhoto()
13074: iwRenderDamagesSummary()
13089: iwRenderComparison()
13108: iwRenderChecklist()
13127: persistInspectionTerm()
13230: saveInspectionDraft()
13231: emitInspectionTerm()
13233: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13234: blobToEmbeddableJpeg()
13264: embedBlobIntoPdf()
13277: generateInspectionPdfBytes()
13477: ensureInspectionPdfBlob()
13487: downloadInspectionPdf()
13499: printInspectionPdf()
13512: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13513: closeInspectionDetail()
13514: openInspectionDetail()
13574: saveInspectionSignatures()
13600: uploadSignedInspectionFile()
13622: cancelInspectionPrompt()

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

## supabase/functions/motora-assinatura/index.ts (542 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
92: publicDocSummary()
129: authUser()

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
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
